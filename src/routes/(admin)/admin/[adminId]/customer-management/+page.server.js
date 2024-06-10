
/**
 * @typedef {Object} CustomerData
 * @property {number} id
 * @property {string} name
 * @property {string} password
 * @property {string} phone
 * @property {string} location
 * @property {string} email
 * @property {string} imageAvatar
 * @property {string} product_avatar
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} role
 * @property {boolean} status
 * @property {number} customer_id
 * 
 */



/**
 * @typedef {Object} Result
 * @property {CustomerData} customer_data
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

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {

	try {
		const customerId = event.params.adminId
		if (!customerId)
			throw fail(400, {
				message: 'Failed to fetch customer products'
			});

		const response = await fetch(
			`http://127.0.0.1:8080/api/v1/customer/getallcustomer`
		);


		/** @type {DtoResponse} */
		const Customer = await response.json();
		console.log('customerawit',Customer)
		return {
			Customer 
		};
		
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch customer'
		});
	}
};




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
        
	} ,
	deleteCustomer: async ({ request }) => {
		try {
			console.log('deleteUser');
			const {customer_id} = Object.fromEntries(await request.formData());
			const formData = new FormData();
			formData.append('id',customer_id)	
			console.log('cus===>',customer_id)
			console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx')
	
			if (!customer_id) {
				throw new Error('User ID is missing');
			}
	
			console.log('Deleting user with ID:', customer_id);
	
			let config = {
				method: 'DELETE', // เปลี่ยนเป็น DELETE
				headers: {
					'Content-Type': 'application/json' // สมมติว่า API ของคุณต้องการ header นี้
				}
			};
	
			const result = await fetch(`http://localhost:8080/api/v1/customer/account-delete/${formData}`, config); // เพิ่ม ID ใน URL
			if (!result.ok) {
				throw new Error('Failed to delete user');
			}
	
			const data = await result.json();
			return {
				data
			};
		} catch (error) {
			console.error('Error:', error.message);
			return {
				error: error.message
			};
		}
	}
	
} ;






