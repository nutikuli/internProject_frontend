/**
 * @typedef {Object} UserToken
 * @property {string} access_token - The access token
 * @property {string} token_type - The type of the token
 * @property {string} role - The role associated with the token
 * @property {string} expires_in - The expiration time of the token
 * @property {string} issued_at - The issuance time of the token
 */

/**
 * @typedef {Object} Result
 * @property {any} account_data
 * @property {UserToken} token
 */

/**
 * @typedef {Object} DtoResponse
 * @property {string} status - The status of the response
 * @property {string} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {Result} result
 */

import { cookiesConfig } from '$lib/pkg/utils/cookies';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	signIn: async ({ request, cookies }) => {
		console.log('signIn method');

		const { email, password } = Object.fromEntries(await request.formData());

		const formData = new FormData();

		// Append key-value pairs to the FormData object
		formData.append('email', email);
		formData.append('password', password);

		console.log('checking login');
		console.log('email,pass:', email, '   ', password);

		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/login`, config);

		/** @type {DtoResponse} */
		const data = await result.json();
		console.log(data);

		if (data.message === 'EmailNotFound') {
			console.error('email not found');
			return {
				success: false
			};
		}
		
		if(data.message === 'crypto/bcrypt: hashedPassword is not the hash of the given password'){
			return {
				success:false
			}
		}
		

		console.log('before set account', data.result.account_data);
		switch (data.result.token.role) {
			case 'CUSTOMER':
				cookies.set('customer_account', JSON.stringify(data.result.account_data), cookiesConfig);
				break;
			case 'STORE':
				console.log('set account', data.result.account_data);
				cookies.set('store_account', JSON.stringify(data.result.account_data), cookiesConfig);
				break;
			case 'ADMIN':
				cookies.set('admin_account', JSON.stringify(data.result.account_data), cookiesConfig);
				break;
			default:
				throw fail(400, {
					message: "role doesn't match any known roles, the set cookie is prevent"
				});
		}

		cookies.set('token', JSON.stringify(data.result.token), cookiesConfig);

		if(data.result.token.role =="STORE"){
			return {
				data,
				role: data.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
				id:data.result.account_data.store_data.id,
				success: true
			};
		}
		if(data.result.token.role =="CUSTOMER"){
			return {
				data,
				role: data.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
				id:data.result.account_data.customer_data.id,
				success: true
			};
		}
		if(data.result.token.role =="ADMIN"){
			return {
				data,
				role: data.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
				id:data.result.account_data.admin_data.id,
				success: true
			};
		}
		
	},

	signInWithGoogle: async ({ request }) => {
		const { email, name } = Object.fromEntries(await request.formData());

		const formData = new FormData();
		console.log('checking register');
		// Append key-value pairs to the FormData object
		formData.append('acc_name', name);
		formData.append('acc_password', '');
		formData.append('password', '');
		formData.append('acc_phone', '');
		formData.append('acc_location', '');
		formData.append('acc_email', email);
		formData.append('email', email);
		formData.append('acc_role', 'CUSTOMER');
		formData.append('acc_status', 'true');
		console.log(formData);

		console.log('email,pass:', email);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {},
			body: formData
		};
		var result = await fetch(`http://localhost:8080/api/v1/account/login`, config);
		const datalogin = await result.json();
		console.log(datalogin);

		if (datalogin.message == 'EmailNotFound') {
			var resultregister = await fetch(`http://localhost:8080/api/v1/account/register`, config);
			const dataregister = await resultregister.json();
			console.log(dataregister);
			console.log('1');
			return {
				dataregister,
				role: 'CUSTOMER',
				success: true
			};
		} else {
			if(datalogin.result.token.role =="STORE"){
				return {
					datalogin,
					role: datalogin.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
					id:datalogin.result.account_data.store_data.id,
					success: true
				};
			}
			if(datalogin.result.token.role =="CUSTOMER"){
				return {
					datalogin,
					role: datalogin.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
					id:datalogin.result.account_data.customer_data.id,
					success: true
				};
			}
			if(datalogin.result.token.role =="ADMIN"){
				return {
					datalogin,
					role: datalogin.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
					id:datalogin.result.account_data.admin_data.id,
					success: true
				};
			}
		}
	},

	signInWithLine: async ({ request }) => {
		const { uid, name } = Object.fromEntries(await request.formData());
		const formData = new FormData();
		console.log('checking register');
		// Append key-value pairs to the FormData object
		formData.append('acc_name', name);
		formData.append('acc_password', '');
		formData.append('password', '');
		formData.append('acc_phone', '');
		formData.append('acc_location', '');
		formData.append('acc_email', uid);
		formData.append('email', uid);
		formData.append('acc_role', 'CUSTOMER');
		formData.append('acc_status', 'true');
		console.log(formData);

		console.log('uid , pass:', uid);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {},
			body: formData
		};
		var result = await fetch(`http://localhost:8080/api/v1/account/login`, config);
		const datalogin = await result.json();
		console.log(datalogin);

		if (datalogin.message == 'EmailNotFound') {
			var resultregister = await fetch(`http://localhost:8080/api/v1/account/register`, config);
			const dataregister = await resultregister.json();
			console.log(dataregister);
			console.log('1');
			return {
				dataregister,
				role: 'CUSTOMER',
				success: true
			};
		} else {
			if(datalogin.result.token.role =="STORE"){
				return {
					datalogin,
					role: datalogin.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
					id:datalogin.result.account_data.store_data.id,
					success: true
				};
			}
			if(datalogin.result.token.role =="CUSTOMER"){
				return {
					datalogin,
					role: datalogin.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
					id:datalogin.result.account_data.customer_data.id,
					success: true
				};
			}
			if(datalogin.result.token.role =="ADMIN"){
				return {
					datalogin,
					role: datalogin.result.token.role, // ไม่สามารถเพิ่มข้อมูล admin กับ store ไกด้
					id:datalogin.result.account_data.admin_data.id,
					success: true
				};
			}
		}
	}
};
