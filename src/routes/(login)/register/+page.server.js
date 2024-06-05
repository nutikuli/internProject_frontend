export const actions = {
	signUp: async ({ request }) => {
		console.log('createUser');
		const { email, password,name, address,tel} = Object.fromEntries(await request.formData());

		const formData = new FormData();
        console.log('checking register');
		// Append key-value pairs to the FormData object
        formData.append('acc_name', name);
        formData.append('acc_password', password);
		formData.append('acc_phone', tel);
		formData.append('acc_location', address);
        formData.append('acc_email', email);
        formData.append('acc_role', "CUSTOMER");
        formData.append('acc_status', "true");
        console.log(formData)
		
		console.log('email,pass:', email, '   ', password);
		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch(`http://localhost:8080/api/v1/account/register`, config);
		const data = await result.json();
        console.log(data)
        window.location.href = '/';
        return {
            data
        }
        
	}

	
};