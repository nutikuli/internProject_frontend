/**
 * @typedef {Object} OrderData
 * @property {Order} order_data - The status of the response
 * @property {import('$lib/pkg/utils/cookies').Account} customer_data
 */

/**
 * @typedef {Object} DtoOrdersResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {OrderData[]} result
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

		const res = await fetch(`${baseDomainEndpoint}/api/v1/order/get-orders-by-store-id/${storeId}`);

		/** @type {DtoOrdersResponse} */
		const storeOrders = await res.json();
		if (storeOrders.status_code != 201 && storeOrders.status_code != 200) {
			console.error(storeOrders.message);
			throw fail(404, {
				message: 'Store Orders not found'
			});
		}

		const { store_account } = CookiesJsonParser(event.cookies, 'store_account');
		return {
			store_account,
			result: storeOrders.result
		};
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch store products'
		});
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	updateOrderState: async ({ request, cookies }) => {
		const { state, order_id, transport_data } = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		// @ts-ignore
		let transport_dat = { ...JSON.parse(transport_data) };

		let sent_date;
		if (Date.parse(transport_dat.sent_date)) {
			sent_date = new Date(transport_dat.sent_date).toISOString();
		} else {
			console.error('Invalid date:', transport_dat.sent_date);
			// Handle the error...
		}

		const sender = {
			state_data: {
				state: state
			},
			transport_data: {
				...transport_dat,
				sent_date: sent_date
			}
		};

		console.log(sender);

		const config = configGetter(
			'PATCH',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const res = await fetch(
			`${baseDomainEndpoint}/api/v1/order/update-order-state/${order_id}`,
			config
		);
		const data = await res.json();
		/** @type {DtoOrdersResponse} */
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to update order state'
			});
		}

		return {
			result: data.result,
			success: true
		};
	}
};
