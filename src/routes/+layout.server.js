/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
	return {
		account_token: event.locals.account_token
	};
}
