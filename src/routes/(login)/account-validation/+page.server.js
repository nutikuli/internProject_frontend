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
        
	}

	
};