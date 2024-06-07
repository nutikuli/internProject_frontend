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
