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
 * @typedef {Object} Result
 * @property {FileData[]} files_data
 * @property {ProductData} product_data
 * @property {ProductCategoryData} product_category_data
 */

/**
 * @typedef {Object} DtoResponse
 * @property {string} status - The status of the response
 * @property {string} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {Result[]} result
 */

import { fail } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Load}
 */

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const storeId = params.storeId;
		if (!storeId)
			throw fail(400, {
				message: 'Failed to fetch store products'
			});

		const response = await fetch(
			`http://127.0.0.1:8080/api/v1/product/get-products-by-store-id/${storeId}`
		);

		/** @type {DtoResponse} */
		const storeProducts = await response.json();

		// Return the data to be used in the component
		return {
			...storeProducts
		};
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch store products'
		});
	}
}
