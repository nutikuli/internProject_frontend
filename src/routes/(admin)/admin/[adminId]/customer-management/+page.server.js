

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
        
	} 
}