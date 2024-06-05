


export const actions = {
	signIn: async ({ request,cookies }) => {
		console.log('SignIn');
		const { email, password } = Object.fromEntries(await request.formData());

		const formData = new FormData();

		// Append key-value pairs to the FormData object
		formData.append('email', email);
		formData.append('password', password);

		console.log('checking login');
		console.log('email,pass:', email, '   ', password);

		
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/login`, config);
		const data = await result.json();
        console.log(data)
		const cookiesConfig = {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		};
		cookies.set('token', JSON.stringify(data.result.user_token), cookiesConfig);
		cookies.set('user', JSON.stringify(data.result.account_data), cookiesConfig);
        // @ts-ignore
		if (data.message=="EmailNotFound") {
            return {
                success: false
				
            };
        }
        return {
            data,
            success:true
        }
        
	},

	signInWithGoogle: async ({ request }) => {

		const { email,name} = Object.fromEntries(await request.formData());

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
			headers: {
			},
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
			return {
				dataregister,
				success: false,
			}
        }else{
			console.log("2")
			return {
				datalogin,
				success:false
			}
		}

		
        
       
	},


};




