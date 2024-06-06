/**
 * @typedef {Object} CookiesConfig
 * @property {string} path
 * @property {boolean} httpOnly
 * @property {'strict' | 'lax' | 'none' | undefined} sameSite
 * @property {boolean} secure
 * @property {number} maxAge
 */

/**
 * @typedef {Object} UserToken
 * @property {string} access_token - The access token
 * @property {string} token_type - The type of the token
 * @property {string} role - The role associated with the token
 * @property {string} expires_in - The expiration time of the token
 * @property {string} issued_at - The issuance time of the token
 */

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
 * @typedef {Object} Account
 * @property {number} id
 * @property {string} name
 * @property {string} password
 * @property {string} phone
 * @property {string} location
 * @property {string} email
 * @property {string} image_avatar
 * @property {Date} created_at
 * @property {Date} updated_at
 * @property {string} role
 * @property {boolean} status
 */

/**
 * @typedef {Object} StoreAccount
 * @property {string} store_name
 * @property {string} store_location
 * @property {number} id
 * @property {string} name
 * @property {string} password
 * @property {string} phone
 * @property {string} location
 * @property {string} email
 * @property {string} image_avatar
 * @property {Date} created_at
 * @property {Date} updated_at
 * @property {string} role
 * @property {boolean} status
 */

/**
 * @typedef {Object} Store
 * @property {StoreAccount} store_data
 * @property {FileData[]} files_data
 */

/**
 * @typedef {Object} Admin
 * @property {number} id
 * @property {string} name
 * @property {string} password
 * @property {string} phone
 * @property {string} location
 * @property {string} email
 * @property {string} image_avatar
 * @property {Date} created_at
 * @property {Date} updated_at
 * @property {string} role
 * @property {boolean} status
 * @property {string[]} adminpermission_data
 * @property {FileData[]} files_data
 */

/**
 * @typedef {Object} TypeMap
 * @property {UserToken} token
 * @property {Account} customer_account
 * @property {Store} store_account
 * @property {Admin} admin_account
 * // Add more keys and types as needed
 */

/** @type {CookiesConfig} */
export const cookiesConfig = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 7 // 1 week
};

/**
 * @typedef {import('@sveltejs/kit').Cookies} Cookies
 */

/**
 * @template {keyof TypeMap} K
 * @param {Cookies} cookies
 * @param {...K} cKeys
 * @returns {{ [J in K]: TypeMap[J] }}
 * @throws {Error}
 */
export function CookiesJsonParser(cookies, ...cKeys) {
	if (cKeys.length < 1 || !cookies) {
		throw new Error('No cookies or json provided');
	}

	/** @type {Partial<Record<K, TypeMap[K]>>} */
	const dict = {};
	for (const j of cKeys) {
		const res = cookies.get(j);
		if (!res) {
			throw new Error('Cookie not found');
		}
		dict[j] = JSON.parse(res);
	}

	return /** @type {{ [J in K]: TypeMap[J] }} */ (dict);
}
