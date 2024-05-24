/** @type {import('../$types').PageLoad} */
export async function load() {
	return {
		props: {
			message: 'Hello World'
		}
	};
}
