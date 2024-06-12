import { cookiesConfig } from '$lib/pkg/utils/cookies';
import { fail } from '@sveltejs/kit';

export const actions = {
	signUpStore: async ({ request,cookies }) => {
		console.log('createStore');
		const { name,tel,storelocation,email, password ,storename} = Object.fromEntries(await request.formData());
		


		const store_register_data = {
			store_register_data: {
				store_name: storename,
				store_location: storelocation,
				acc_name: name,
				acc_password: password,
				acc_phone: tel,
				acc_location: storelocation,
				acc_email: email,
				acc_role: "STORE",
				acc_status: true
			}
		};
		
		const storeRegisterDataString = JSON.stringify(store_register_data);
		
		
		
		console.log('checking store register');
		console.log(storeRegisterDataString)
		
   

		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
				'Content-Type': 'application/json' // ระบุว่าเนื้อหาที่ส่งเป็น JSON
			},
			body: storeRegisterDataString
		};

		var result = await fetch("http://127.0.0.1:8080/api/v1/store/account-register", config);
		const data = await result.json();


		cookies.set('token', JSON.stringify(data.result.token), cookiesConfig);

        return {
            data,
			success: true,
			role:data.result.token.role,
        }
	},
	signInWithGoogle: async ({ request ,cookies }) => {
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


	
			cookies.set('token', JSON.stringify(dataregister.result.token), cookiesConfig);
			return {
				dataregister,
				role: 'CUSTOMER',
				success: true
			};
		} else {

	
			cookies.set('token', JSON.stringify(datalogin.result.token), cookiesConfig);
			console.log('2');
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
	
	signInWithLine: async ({ request ,cookies }) => {
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

	
	
			cookies.set('token', JSON.stringify(dataregister.result.token), cookiesConfig);
			
			return {
				dataregister,
				role: 'CUSTOMER',
				success: true
			};
		} else {
			console.log('2');
			
	
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
