/**
 * @typedef {Object} StroeData
 * @property {number} id
 * @property {string} store_name
 * @property {string} store_location
 * @property {string} name
 * @property {string} password
 * @property {string} phone
 * @property {string} location
 * @property {string} email
 * @property {string} role
 * @property {boolean} status
 * @property {number} store_id
 * 
 */



/**
 * @typedef {Object} Result
 * @property {StroeData} store_data
 */

/**
 * @typedef {Object} DtoResponse
 * @property {string} status - The status of the response
 * @property {string} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {Result[]} result
 */

import { fail } from '@sveltejs/kit';


/**
 * @type {import('@sveltejs/kit').Load}
 */

/** @type {import('./$types').PageServerLoad} */
// export const load = async (event) => {
// 	try {
// 		const storeId = event.params.adminId
// 		if (!storeId)
// 			throw fail(400, {
// 				message: 'Failed to fetch store '
// 			});

// 		const response = await fetch(
// 			`http://127.0.0.1:8080/api/v1/store//get-stores`
// 		);

// 		/** @type {DtoResponse} */
// 		const Store = await response.json();

// 		return {
// 			...Store 
// 		};
// 	} catch (error) {
// 		throw fail(error.status || 500, {
// 			message: error.message || 'Failed to fetch store '
// 		});
// 	}
// }; 

export const load = async (event) => {
	try {
		const storeId = event.params.adminId;
		if (!storeId) {
			throw fail(400, {
				message: 'ไม่สามารถดึงข้อมูลร้านค้าได้'
			});
		}

		const response = await fetch(
			`http://127.0.0.1:8080/api/v1/store/get-stores`
		);

		if (!response.ok) {
			// บันทึกสถานะและข้อความการตอบกลับเพื่อการดีบัก
			const errorText = await response.text();
			console.error('การตอบกลับไม่ถูกต้อง:', response.status, errorText);
			throw new Error('ไม่สามารถดึงข้อมูลร้านค้าได้');
		}

		/** @type {DtoResponse} */
		const Store = await response.json();

		return {
			...Store
		};
	} catch (error) {
		// บันทึกข้อผิดพลาดเพื่อการดีบัก
		console.error('ข้อผิดพลาดในการดึงข้อมูลร้านค้า:', error);
		throw fail(error.status || 500, {
			message: error.message || 'ไม่สามารถดึงข้อมูลร้านค้าได้'
		});
	}
};




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
        
	} ,
	deleteStore: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
	
		// แสดงค่า formData ทั้งหมด
		console.log('Form Data:', formData);
	
		const { store_id } = formData;
	
		// แสดงค่า customer_id เพื่อการตรวจสอบ
		console.log('รหัสลูกค้า:', store_id);
	
		// ตรวจสอบว่ารหัสลูกค้ามีค่า
		if (!store_id) {
			return fail(400, {
				message: 'รหัสลูกค้าไม่ถูกต้อง'
			});
		}
	
		const configGetter = ( headers = {}, body = null) => {
			return {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				body: body ? JSON.stringify(body) : null
			};
		};
	
		const config = configGetter('DELETE');
	
		try {
			const result = await fetch(`http://127.0.0.1:8080/api/v1/store/delete-store-by-id/${store_id}`, config);
			const data = await result.json();
	
			// แสดงผลการตอบกลับจาก API เพื่อการตรวจสอบ
			console.log('การตอบกลับจาก API:', data);
	
			if (data.status_code != 201 && data.status_code != 200) {
				console.error('ลบลูกค้าไม่สำเร็จ:', data);
				return fail(400, {
					message: 'ลบลูกค้าไม่สำเร็จ'
				});
			}
	
			console.log('ลบลูกค้าสำเร็จ:', data);
			return {
				result: data.result,
				success: true
			};
		} catch (error) {
			console.error('เกิดข้อผิดพลาดในการลบลูกค้า:', error);
			return fail(500, {
				message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด'
			});
		}
	},
	updateStore: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { store_id, ...updatedata } = formData;
	
		for (let key in updatedata) {
			let value = updatedata[key];
			let numberValue = Number(value);
	
			if (!isNaN(numberValue)) {
				updatedata[key] = numberValue;
			}
	
			if (key === 'status') {
				updatedata[key] = Boolean(+value);
			}
		}
	
		const sender = {
			...updatedata
		};
	
		const config = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json' // Assuming JSON data
			},
			body: JSON.stringify(sender)
		};
	
		try {
			const result = await fetch(`http://127.0.0.1:8080/api/v1/store/update-store-by-id/${store_id}`, config);
			const data = await result.json();
	
			if (data.status_code !== 201 && data.status_code !== 200) {
				console.error(data);
				return fail(400, {
					message: 'Failed to update product'
				});
			}
	
			console.log(data);
			return {
				result: data.result,
				success: true
			};
		} catch (error) {
			console.error('Error:', error);
			return fail(500, {
				message: 'Internal Server Error'
			});
		}
	}
	



}