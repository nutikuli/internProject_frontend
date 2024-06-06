export const baseDomainEndpoint = 'http://127.0.0.1:8080';

/**
 * @typedef {Object} UserToken
 * @property {string} access_token - The access token
 * @property {string} token_type - The type of the token
 * @property {string} role - The role associated with the token
 * @property {string} expires_in - The expiration time of the token
 * @property {string} issued_at - The issuance time of the token
 */

/**
 * @typedef {Object} HeaderConfig
 * @property {'ADMIN' | 'CUSTOMER' | 'STORE'} [role]
 * @property {string} username
 */

/**
 * Generates headers with a token and optional configurations.
 * @param {UserToken} token - The token to be included in the headers.
 * @param {HeaderConfig} [opt] - Optional header configurations.
 * @returns {Object} The headers object.
 */
export const headerWithToken = (token, opt) => {
	return {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
		...opt
	};
};

/**
 * @typedef {'GET' | 'POST' | 'PATCH' | 'DELETE'} RequestMethod
 */

/**
 * Generates configuration for a HTTP request.
 * @param {RequestMethod} method - The HTTP method to be used.
 * @param {Object} dataToJson - The JSON data to be sent in the request.
 * @param {headerWithToken} header - The headers to be included in the request.
 * @returns {Object} The configuration object.
 */
export const configGetter = (method, dataToJson, header) => {
	return {
		method: method,
		headers: header,
		body: JSON.stringify(dataToJson)
	};
};
