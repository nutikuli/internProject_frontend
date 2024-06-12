import { CookiesJsonParser } from '$lib/pkg/utils/cookies';
import { fail } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ resolve, event }) => {
	try {
		const { token } = CookiesJsonParser(event.cookies, 'token');

		let store_account = event.cookies.get('store_account');

		// @ts-ignore
		let customer_account = event.cookies.get('customer_account');
		// const store_account = event.cookies.get('store_account');

		switch (token.role) {
			case 'STORE':
				if (store_account) {
					store_account = JSON.parse(store_account);
				}
				event.locals.account_token = {
					token,
					account: {
						// @ts-ignore
						id: store_account.store_data.id,
						role: token.role
					}
				};
				break;
			case 'ADMIN':
				break;
			case 'CUSTOMER':
				if (customer_account) {
					customer_account = JSON.parse(customer_account);

					event.locals.account_token = {
						token,
						account: {
							// @ts-ignore
							id: customer_account.id,
							role: token.role
						}
					};
				}
				break;
			default:
				throw fail(400, {
					message: 'Invalid token role'
				});
		}
		return await resolve(event);
	} catch (error) {
		/** @type {Error} err */
		let err = error;
		if (err.message === 'Cookie not found') {
			// @ts-ignore
			event.locals.account_token = null;
			return await resolve(event);
		}
		throw error;
	}
};
