export const actions = {
	registerstore: async ({ request }) => {
		console.log('createStore');
		const { name,phone,storelocation,email, password ,storename} = Object.fromEntries(await request.formData());
		let surname = ""
		const formData = new FormData();

		formData.append('acc_name',name +" "+surname)
        formData.append('acc_phone',phone)
        formData.append('store_location',storelocation)
		formData.append('acc_email', email);
		formData.append('acc_password', password);
		formData.append('acc_role', "ADMIN")
		formData.append('acc_status', "true")
        formData.append('store_name' , storename)

		console.log('checking store register');
		console.log('email,pass:', email, '  ', password);
        console.log('name=====>',name)
        console.log('phone=====>',phone)
        console.log('storelocation=====>',storelocation)
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
        
	} 
}