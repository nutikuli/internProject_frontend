import { cookiesConfig } from '$lib/pkg/utils/cookies';
import { fail } from '@sveltejs/kit';

export const actions = {
	signUp: async ({ request, cookies }) => {
		console.log('createUser');
		const { email, password, name, address, tel } = Object.fromEntries(await request.formData());

		const formData = new FormData();
		console.log('checking register');
		// Append key-value pairs to the FormData object
		formData.append('acc_name', name);
		formData.append('acc_password', password);
		formData.append('acc_phone', tel);
		formData.append('acc_location', address);
		formData.append('acc_email', email);
		formData.append('acc_role', 'CUSTOMER');
		formData.append('acc_status', 'true');
		console.log(formData);

		console.log('email,pass:', email, '   ', password);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/register`, config);
		const data = await result.json();
		console.log("data : ",data.message);
		if(data.message == "Error 1062 (23000): Duplicate entry 'timespawn14@gmail.com' for key 'Account_email_key'"){
			return {
				success: false
			}
		}

		switch (data.result.token.role) {
			case 'CUSTOMER':
				cookies.set('customer_account', JSON.stringify(data.result.token), cookiesConfig);
				break;
			case 'STORE':
				cookies.set('store_account', JSON.stringify(data.result.token), cookiesConfig);
				break;
			case 'ADMIN':
				cookies.set('admin_account', JSON.stringify(data.result.token), cookiesConfig);
				break;
			default:
				throw fail(400, {
					message: "role doesn't match any known roles, the set cookie is prevent"
				});
		}


		cookies.set('token', JSON.stringify(data.result.token), cookiesConfig);
		return {
			data,
			success: true,
			role:data.result.token.role,
		};
	},

	signInWithGoogle: async ({ request,cookies }) => {

		const { email, name } = Object.fromEntries(await request.formData());


		const formData = new FormData();
		console.log('checking register');
		// Append key-value pairs to the FormData object
        formData.append('acc_name', name);
        formData.append('acc_password', "");
		formData.append('password', "");
		formData.append('acc_phone', "");
		formData.append('acc_location', "");
        formData.append('acc_email', email);
		formData.append('email', email);
        formData.append('acc_role', "CUSTOMER");
        formData.append('acc_status', "true");
        console.log(formData)
		
		console.log('email,pass:', email);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {},
			body: formData
		};
		var result = await fetch(`http://localhost:8080/api/v1/account/login`, config);
		const datalogin = await result.json();
		console.log(datalogin)


		if (datalogin.message=="EmailNotFound") {
            var resultregister = await fetch(`http://localhost:8080/api/v1/account/register`, config);
			const dataregister = await resultregister.json();
			console.log(dataregister)
			console.log("1")
			switch (dataregister.result.token.role) {
				case 'CUSTOMER':
					cookies.set('customer_account', JSON.stringify(dataregister.result.token), cookiesConfig);
					break;
				case 'STORE':
					cookies.set('store_account', JSON.stringify(dataregister.result.token), cookiesConfig);
					break;
				case 'ADMIN':
					cookies.set('admin_account', JSON.stringify(dataregister.result.token), cookiesConfig);
					break;
				default:
					throw fail(400, {
						message: "role doesn't match any known roles, the set cookie is prevent"
					});
			}
	
			cookies.set('token', JSON.stringify(dataregister.result.token), cookiesConfig);
			return {
				dataregister,
				role:"CUSTOMER",
				success: true,
			}
        }else{
			console.log("2")
			console.log(datalogin.result.account_data.customer_data.role)
			switch (datalogin.result.token.role) {
				case 'CUSTOMER':
					cookies.set('customer_account', JSON.stringify(datalogin.result.token), cookiesConfig);
					break;
				case 'STORE':
					cookies.set('store_account', JSON.stringify(datalogin.result.token), cookiesConfig);
					break;
				case 'ADMIN':
					cookies.set('admin_account', JSON.stringify(datalogin.result.token), cookiesConfig);
					break;
				default:
					throw fail(400, {
						message: "role doesn't match any known roles, the set cookie is prevent"
					});
			}
	
			cookies.set('token', JSON.stringify(datalogin.result.token), cookiesConfig);
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

	signInWithLine: async ({ request,cookies }) => {
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
			switch (dataregister.result.token.role) {
				case 'CUSTOMER':
					cookies.set('customer_account', JSON.stringify(dataregister.result.token), cookiesConfig);
					break;
				case 'STORE':
					cookies.set('store_account', JSON.stringify(dataregister.result.token), cookiesConfig);
					break;
				case 'ADMIN':
					cookies.set('admin_account', JSON.stringify(dataregister.result.token), cookiesConfig);
					break;
				default:
					throw fail(400, {
						message: "role doesn't match any known roles, the set cookie is prevent"
					});
			}
			return {
				dataregister,
				role: 'CUSTOMER',
				success: true
			};
		} else {
			console.log('2');
			switch (datalogin.result.token.role) {
				case 'CUSTOMER':
					cookies.set('customer_account', JSON.stringify(datalogin.result.token), cookiesConfig);
					break;
				case 'STORE':
					cookies.set('store_account', JSON.stringify(datalogin.result.token), cookiesConfig);
					break;
				case 'ADMIN':
					cookies.set('admin_account', JSON.stringify(datalogin.result.token), cookiesConfig);
					break;
				default:
					throw fail(400, {
						message: "role doesn't match any known roles, the set cookie is prevent"
					});
			}
	
			cookies.set('token', JSON.stringify(datalogin.result.token), cookiesConfig);
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

