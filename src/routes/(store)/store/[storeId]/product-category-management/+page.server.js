/**
 * @typedef {Object} DtoProductCategoryResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {ProductCategoryData[]} result
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

		const productCatesRes = await fetch(
			`${baseDomainEndpoint}/api/v1/product-category/get-product-categories-by-store-id/${storeId}`
		);

		/** @type {DtoProductCategoryResponse} */
		const storeProductCates = await productCatesRes.json();
		if (storeProductCates.status_code != 201 && storeProductCates.status_code != 200) {
			console.error(storeProductCates.message);
			throw fail(404, {
				message: 'Store ProductCategory not found'
			});
		}

		const { store_account } = CookiesJsonParser(event.cookies, 'store_account');
		return {
			store_account,
			product_category: storeProductCates.result
		};
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch store products'
		});
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	createProductCategory: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		let { store_id, ...product_cate_Data } = formData;

		for (let key in product_cate_Data) {
			let value = product_cate_Data[key];

			if (key === 'status') {
				// @ts-ignore
				product_cate_Data[key] = Boolean(+value);
			}
		}

		const sender = {
			...product_cate_Data
		};

		console.log(sender);

		const config = configGetter(
			'POST',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/product-category/create-product-category/${store_id}`,
			config
		);

		const data = await result.json();
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to create product'
			});
		}

		return {
			result: data.result,
			success: true
		};
	},

	updateCategoryProduct: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		let { product_category_id, ...product_cate_Data } = formData;

		for (let key in product_cate_Data) {
			let value = product_cate_Data[key];
			let numberValue = Number(value);

			if (!isNaN(numberValue)) {
				// @ts-ignore
				product_cate_Data[key] = numberValue;
			}

			if (key === 'status') {
				// @ts-ignore
				product_cate_Data[key] = Boolean(+value);
			}
		}

		const sender = {
			...product_cate_Data
		};

		const config = configGetter(
			'PATCH',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/product-category/update-product-category-id/${product_category_id}`,
			config
		);

		const data = await result.json();
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to update product'
			});
		}

		console.log(data);
		return {
			result: data.result,
			success: true
		};
	},

	deleteCategoryProduct: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		const { product_category_id } = formData;

		const config = configGetter(
			'DELETE',
			null,
			headerWithToken(token, { username: store_account.store_data.name })
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/product-category/delete-product-category-id/${product_category_id}`,
			config
		);

		const data = await result.json();
		if (data.status_code != 201 && data.status_code != 200) {
			console.error(data);
			return fail(400, {
				message: 'Failed to delete product'
			});
		}

		console.log(data);
		return {
			result: data.result,
			success: true
		};
	}
};
