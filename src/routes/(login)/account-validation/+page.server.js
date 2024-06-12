let dataEmail = [];
export const actions = {
	OTP: async ({ request }) => {
		console.log('OTP');
		const { email } = Object.fromEntries(await request.formData());

		const formData = new FormData();

		// Append key-value pairs to the FormData object
		formData.append('email', email);

		console.log('checking otp');
		console.log('email:', email);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/otp`, config);
		const data = await result.json();

        console.log("data otp : ",data)
        dataEmail.push(data.email)
        console.log("data email : ",dataEmail)
        return {
            data
        }
        
	},

    ResetPassword: async ({ request }) => {
		console.log('ResetPassword');
		const {email,password } = Object.fromEntries(await request.formData());

		const formData = new FormData();
    
		// Append key-value pairs to the FormData object
		formData.append('password', password);
        formData.append('email', email);

		console.log('checking reset password');
		console.log('email : password:', password,":",email);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/resetpass`, config);
		const data = await result.json();
        
        console.log("data password : ",data)
        return {
            data
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
	}

	
};