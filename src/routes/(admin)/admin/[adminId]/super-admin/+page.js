export const actions = {
	registeradmin: async ({ request }) => {
		console.log('createAdmin');
		const { name,phone,email, password } = Object.fromEntries(await request.formData());
		let surname = ""
		const formData = new FormData();
		
		formData.append('name',name +" "+surname)
        formData.append('phone',phone)
        // formData.append('location',storelocation)
		formData.append('email', email);
		formData.append('password', password);
		formData.append('role', "ADMIN")
		formData.append('status', "true")
        // formData.append('store_name' , storename)

		console.log('checking login');
		console.log('email,pass:', email, '  ', password);
        console.log('name=====>',name)
        console.log('phone=====>',phone)
        // console.log('storelocation=====>',storelocation)
        console.log('email=====>',email)
        console.log('password=====>',password)
        // console.log('storename=====>',storename)
   

		let config = {
			method: 'POST', //การทำงาน get post update delete
			headers: {
			},
			body: formData
		};

		var result = await fetch("http://localhost:8080/api/v1/admin/account-register", config);
		const data = await result.json();
        return {
            data
        }
        
	} 
}