export const actions = {
	signUpStore: async ({ request }) => {
		console.log('createStore');
		const { name,tel,address,email, password ,storename} = Object.fromEntries(await request.formData());
		const formData = new FormData();

		formData.append('acc_name',name )
        formData.append('acc_phone',tel)
        formData.append('store_location',address)
		formData.append('acc_email', email);
		formData.append('acc_password', password);
		formData.append('acc_role', "STORE")
		formData.append('acc_status', "true")
        formData.append('store_name' , storename)

		console.log('checking store register');
		console.log('email,pass:', email, '  ', password);
        console.log('name=====>',name)
        console.log('phone=====>',tel)
        console.log('storelocation=====>',address)
        console.log('email=====>',email)
        console.log('password=====>',password)
        console.log('storename=====>',storename)
   

		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch("http://localhost:8080/api/v1/store/account-register", config);
		const data = await result.json();
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
		formData.append('acc_phone', '');
		formData.append('acc_location', '');
		formData.append('acc_email', email);
		formData.append('acc_role', 'CUSTOMER');
		formData.append('acc_status', 'true');
		console.log(formData);

		console.log('email,pass:', email);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/register`, config);
		const data = await result.json();
		console.log(data);
		return {
			data,
			success: true
		};

		
	}
};
