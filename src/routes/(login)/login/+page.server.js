// import { onSignIn, getUserData } from './NewAuthUsecase'; // นำเข้าฟังก์ชัน onSignIn และ getUserData จากไฟล์ NewAuthUsecase.ts






export const actions = {
	signIn: async ({ request }) => {
		console.log('createUser');
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
		setCookie('email', email, { expires: 365 });
        // @ts-ignore
		if (data.message=="EmailNotFound") {
            return {
                success: false
				
            };
        }
        return {
            data,
            success: true,
        }
        
	},

	signInWithGoogle: async ({ request }) => {
		const { email,name} = Object.fromEntries(await request.formData());

		const formData = new FormData();
        console.log('checking register');
		// Append key-value pairs to the FormData object
        formData.append('acc_name', name);
        formData.append('acc_password', "");
		formData.append('acc_phone', "");
		formData.append('acc_location', "");
        formData.append('acc_email', email);
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

		var result = await fetch(`http://localhost:8080/api/v1/account/register`, config);
		const data = await result.json();
        console.log(data)
        return {
            data,
			success: true,
        }
	},


};


function setCookie(arg0, email, arg2) {
	throw new Error("Function not implemented.");
}

