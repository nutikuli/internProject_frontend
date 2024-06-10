/**
 * @typedef {Object} FileData
 * @property {number} id
 * @property {string} file_name
 * @property {string} file_data
 * @property {string} file_type
 * @property {string} entity_type
 * @property {?number} account_id
 * @property {number} product_id
 * @property {?number} order_id
 * @property {?number} bank_id
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} ProductCategoryData
 * @property {number} id
 * @property {string} name
 * @property {boolean} status
 * @property {string} code
 * @property {string} detail
 * @property {number} store_id
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Bank
 * @property {number} id
 * @property {string} name
 * @property {string} acc_number
 * @property {string} acc_name
 * @property {string} avatar_url
 * @property {string} status
 * @property {number} store_id
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} BankResult
 * @property {FileData[]} files_data
 * @property {Bank} bank_data
 */

/**
 * @typedef {Object} DtoBanksResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {BankResult[]} result
 */

import { baseDomainEndpoint, configGetter, headerWithToken } from '$lib/internal/adapters/handler';
import { CookiesJsonParser } from '$lib/pkg/utils/cookies';
import { fail } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Load}
 */

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	try {
		const storeId = event.params.storeId;
		if (!storeId)
			throw fail(400, {
				message: 'Failed to fetch store products'
			});

		const banksRes = await fetch(
			`${baseDomainEndpoint}/api/v1/bank/get-banks-by-store-id/${storeId}`
		);

		/** @type {DtoBanksResponse} */
		const storeBank = await banksRes.json();
		if (storeBank.status_code != 201 && storeBank.status_code != 200) {
			console.error(storeBank.message);
			throw fail(404, {
				message: 'Bank not found'
			});
		}

		const { store_account } = CookiesJsonParser(event.cookies, 'store_account');
		return {
			store_account,
			bankResult: storeBank.result
		};
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch store products'
		});
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	createBank: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		let { files_data, ...bank_data } = formData;

		for (let key in bank_data) {
			let value = bank_data[key];
			let numberValue = Number(value);

			if (!isNaN(numberValue) && key !== 'acc_number') {
				// @ts-ignore
				bank_data[key] = numberValue;
			}

			if (key === 'status') {
				// @ts-ignore
				bank_data[key] = Boolean(+value);
			}
		}

		const sender = {
			files_data: JSON.parse(files_data.toString()),
			bank_data: bank_data
		};

		console.log(sender);

		const config = configGetter(
			'POST',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const result = await fetch(`${baseDomainEndpoint}/api/v1/bank/create-bank`, config);

		/** @type {DtoBanksResponse} */
		const data = await result.json();
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to create bank'
			});
		}

		return {
			result: data.result,
			success: true
		};
	},

	updateBank: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		let { files_data, bank_id, ...bank_data } = formData;

		for (let key in bank_data) {
			let value = bank_data[key];
			let numberValue = Number(value);

			if (!isNaN(numberValue) && key !== 'acc_number') {
				// @ts-ignore
				bank_data[key] = numberValue;
			}

			if (key === 'status') {
				// @ts-ignore
				bank_data[key] = Boolean(+value);
			}
		}

		const sender = {
			files_data: JSON.parse(files_data.toString()),
			bank_data: bank_data
		};

		console.log(sender);

		const config = configGetter(
			'PATCH',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/bank/update-bank-id/${bank_id}`,
			config
		);

		/** @type {DtoBanksResponse} */
		const data = await result.json();
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to update bank'
			});
		}

		console.log(data);
		return {
			result: data.result,
			success: true
		};
	},

	deleteBank: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		const { bank_id } = formData;

		const config = configGetter(
			'DELETE',
			null,
			headerWithToken(token, { username: store_account.store_data.name })
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/bank/delete-bank-id/${bank_id}`,
			config
		);

		/** @type {DtoBanksResponse} */
		const data = await result.json();
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to delete bank'
			});
		}

		console.log(data);
		return {
			result: data.result,
			success: true
		};
	}
};
