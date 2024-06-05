
/**
 * @typedef {Object} CustomerData
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} DtoResponse
 * @property {string} status - The status of the response
 * @property {string} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {Result[]} result
 */

/**
 * @typedef {Object} Result
 * @property {CustomerData} customer_data
 */

import { fail } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Load}
 */

export async function load({ params }) {
	try {
		const customerId = params.customerId;
		if (!customerId)
			throw fail(400, {
				message: 'Failed to fetch store products'
			});

		const response = await fetch(
			`http://127.0.0.1:8080/api/v1/customer/${customerId}`
		);

		/** @type {DtoResponse} */
		const customer = await response.json();

		// Return the data to be used in the component
		return {
			...customer
		};
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch store products'
		});
	}
}




export const actions = {
	registercustomer: async ({ request }) => {
		console.log('createUser');
		const { name,phone,location,email, password } = Object.fromEntries(await request.formData());
		let surname = ""
		const formData = new FormData();

		formData.append('acc_name',name +" "+surname)
        formData.append('acc_phone',phone)
        formData.append('acc_location',location)
		formData.append('acc_email', email);
		formData.append('acc_password', password);
		formData.append('acc_role', "CUSTOMER")
		formData.append('acc_status', "true")

		console.log('checking login');
		console.log('email,pass:', email, '   ', password);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch("http://localhost:8080/api/v1/customer/account-register", config);
		const data = await result.json();
        return {
            data
        }
        
	}  


} 

