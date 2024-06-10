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
 * @typedef {Object} ProductData
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} stock
 * @property {string} detail
 * @property {boolean} status
 * @property {string} product_avatar
 * @property {number} category_id
 * @property {number} store_id
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
 * @typedef {Object} ProductResult
 * @property {FileData[]} files_data
 * @property {ProductData} product_data
 * @property {ProductCategoryData} product_category_data
 */

/**
 * @typedef {Object} DtoProductsResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {ProductResult[]} result
 */

/**
 * @typedef {Object} DtoProductResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {ProductResult} result
 */

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

		const productsRes = await fetch(
			`${baseDomainEndpoint}/api/v1/product/get-products-by-store-id/${storeId}`
		);
		const productCatesRes = await fetch(
			`${baseDomainEndpoint}/api/v1/product-category/get-product-categories-by-store-id/${storeId}`
		);

		/** @type {DtoProductsResponse} */
		const storeProducts = await productsRes.json();
		if (storeProducts.status_code != 201 && storeProducts.status_code != 200) {
			console.error(storeProducts.message);
			throw fail(404, {
				message: 'Store not found'
			});
		}

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
			product_category: storeProductCates.result,
			products: storeProducts.result ? [...storeProducts.result] : []
		};
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch store products'
		});
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	createProduct: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		let { files_data, ...product_Data } = formData;

		for (let key in product_Data) {
			let value = product_Data[key];
			let numberValue = Number(value);

			if (!isNaN(numberValue)) {
				// @ts-ignore
				product_Data[key] = numberValue;
			}

			if (key === 'status') {
				// @ts-ignore
				product_Data[key] = Boolean(+value);
			}
		}

		const sender = {
			files_data: JSON.parse(files_data.toString()),
			product_data: product_Data
		};

		console.log(sender);

		const config = configGetter(
			'POST',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const result = await fetch(`${baseDomainEndpoint}/api/v1/product/create-product`, config);

		/** @type {DtoProductResponse} */
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

	updateProduct: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		let { files_data, product_id, ...product_Data } = formData;

		for (let key in product_Data) {
			let value = product_Data[key];
			let numberValue = Number(value);

			if (!isNaN(numberValue)) {
				// @ts-ignore
				product_Data[key] = numberValue;
			}

			if (key === 'status') {
				// @ts-ignore
				product_Data[key] = Boolean(+value);
			}
		}

		const sender = {
			files_data: JSON.parse(files_data.toString()),
			product_data: product_Data
		};

		const config = configGetter(
			'PATCH',
			sender,
			headerWithToken(token, {
				username: store_account.store_data.name
			})
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/product/update-product-id/${product_id}`,
			config
		);

		/** @type {DtoProductResponse} */
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

	deleteProduct: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, store_account } = CookiesJsonParser(cookies, 'token', 'store_account');

		const { product_id } = formData;

		const config = configGetter(
			'DELETE',
			null,
			headerWithToken(token, { username: store_account.store_data.name })
		);

		const result = await fetch(
			`${baseDomainEndpoint}/api/v1/product/delete-product-id/${product_id}`,
			config
		);

		/** @type {DtoProductResponse} */
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
