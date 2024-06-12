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
 * @typedef {Object} ProductResult
 * @property {FileData[]} files_data
 * @property {ProductData} product_data
 * @property {ProductCategoryData} product_category_data
 */

/**
 * @typedef {Object} ProductWithProductOrderResult
 * @property {FileData[]} files_data
 * @property {ProductData} product_data
 * @property {ProductCategoryData} product_category_data
 * @property {import("$lib/pkg/utils/cookies").OrderProduct} order_product_data
 */

/**
 * @typedef {Object} OrderResult
 * @property {Order} order_data
 * @property {import("$lib/pkg/utils/cookies").Account} customer_data
 * @property {FileData[]} files_data
 * @property {BankResult} bank_payment
 * @property {ProductWithProductOrderResult[]} product_data
 */

/**
 * @typedef {Object} Order
 * @property {number} id
 * @property {number} total_amount
 * @property {string} topic
 * @property {number} sum_price
 * @property {string} state
 * @property {string} delivery_type
 * @property {string} parcel_number
 * @property {string} sent_date
 * @property {number} customer_id
 * @property {number} store_id
 * @property {number} bank_id
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Result
 * @property {FileData[]} files_data
 */

/**
 * @typedef {Object} DtoResponse
 * @property {string} status - The status of the response
 * @property {string} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {Result[]} result
 */
