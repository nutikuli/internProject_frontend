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
 * @typedef {Object} OrderProductData
 * @property {number} id
 * @property {number} product_id
 * @property {number} quantity
 */

/**
 * @typedef {Object} orderProduct
 * @property {FileData[]} files_data
 * @property {ProductData} product_data
 * @property {ProductCategoryData} product_category_data
 * @property {OrderProductData} order_product_data
 */

/**
 * @typedef {Object} DtoProductsResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {orderProduct[]} result
 */

/**
 * @typedef {Object} DtoProductResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {orderProduct} result
 */

/**
 * @typedef {Object} DtoProductCategoryResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {ProductCategoryData[]} result
 */

/**
 * @typedef {Object} DtoOrderProductResponse
 * @property {string} status - The status of the response
 * @property {number} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {OrderProductData} result
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
		const customerId = event.params.customerId;
		if (!customerId)
			throw fail(400, {
				message: 'Failed to fetch customer product'
			});
		console.log(customerId)
		const orderRes = await fetch(
			`${baseDomainEndpoint}/api/v1/order/get-orders-by-customer-id/${customerId}`
		);

		/** @type {DtoProductsResponse} */
		const orderProduct = await orderRes.json();
		if (orderProduct.status_code != 201 && orderProduct.status_code != 200) {
			console.error(orderProduct.message);
			throw fail(404, {
				message: 'Order not found'
			});
		}
		const { customer_account } = CookiesJsonParser(event.cookies, 'customer_account');

		const { customer_cart } = CookiesJsonParser(event.cookies, 'customer_cart');

		return {
			customer_account,
			customer_cart,
			product_category: orderProduct.result,
			products: orderProduct.result ? [...orderProduct.result] : [],
			order_product: orderProduct.result
		};

	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch order products'
		});
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	createOrder: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { token, customer_account, customer_cart } = CookiesJsonParser(cookies, 'token', 'customer_account', 'customer_cart');

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
			product_data: product_Data,
			customer_cart: customer_cart
		};

		console.log(sender);

		const config = configGetter(
			'POST',
			sender,
			headerWithToken(token, {
				username: customer_account.name
			})
		);

		const result = await fetch(`${baseDomainEndpoint}/api/v1/order/create-order`, config);

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
	}
};
