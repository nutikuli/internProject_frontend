
/**
 * @typedef {Object} CustomerData
 * @property {number} id
 * @property {string} acc_name
 * @property {string} acc_password
 * @property {string} acc_phone
 * @property {string} acc_location
 * @property {string} acc_email
 * @property {string} imageAvatar
 * @property {string} product_avatar
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} role
 * @property {boolean} acc_status
 * @property {number} customer_id
 * 
 */



/**
 * @typedef {Object} Result
 * @property {CustomerData} customer_data
 */

/**
 * @typedef {Object} DtoResponse
 * @property {string} status - The status of the response
 * @property {string} status_code - The status code of the response
 * @property {string} message - The message of the response
 * @property {Result[]} result
 */

// import { baseDomainEndpoint , configGetter } from '$lib/internal/adapters/handler';
import { fail } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Load}
 */

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {

	try {
		const customerId = event.params.adminId
		if (!customerId)
			throw fail(400, {
				message: 'Failed to fetch customer products'
			});

		const response = await fetch(
			`http://127.0.0.1:8080/api/v1/customer/getallcustomer`
		);


		/** @type {DtoResponse} */
		const Customer = await response.json();
		console.log('customerawit',Customer)
		return {
			Customer 
		};
		
	} catch (error) {
		throw fail(error.status || 500, {
			message: error.message || 'Failed to fetch customer'
		});
	}
};




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
        
	} ,
	deleteCustomer: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
	
		// แสดงค่า formData ทั้งหมด
		console.log('Form Data:', formData);
	
		const { customer_id } = formData;
	
		// แสดงค่า customer_id เพื่อการตรวจสอบ
		console.log('รหัสลูกค้า:', customer_id);
	
		// ตรวจสอบว่ารหัสลูกค้ามีค่า
		if (!customer_id) {
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
			const result = await fetch(`http://127.0.0.1:8080/api/v1/customer/${customer_id}`, config);
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
	updateCustomer: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
	
		// แสดงค่า formData ทั้งหมด
		console.log('ข้อมูลจากฟอร์ม:', formData);
	
		const { customer_id, ...updateData } = formData;
		for (let key in updateData) {
			let value = updateData[key];
			// let numberValue = Number(value);

			// if (!isNaN(numberValue)) {
			// 	// @ts-ignore
			// 	updateData[key] = numberValue;
			// }

			if (key === 'acc_status') {
				// @ts-ignore
				updateData[key] = Boolean(+value);
			}
		}
	
		// แสดงค่า customer_id เพื่อการตรวจสอบ
		console.log('รหัสลูกค้า:', customer_id);
	
		// ตรวจสอบว่ารหัสลูกค้ามีค่า
		if (!customer_id) {
			return fail(400, {
				message: 'รหัสลูกค้าไม่ถูกต้อง'
			});
		}
		console.log("updatedata=====>",updateData)
		
	
		const configGetter = (headers = {},updateData = {}) => {
			return {
				method: 'PATCH',  // หรือ 'PATCH' ถ้าคุณต้องการการอัปเดตบางส่วน
				headers: {
					'Content-Type': 'application/json',
					...headers
				},
				body: JSON.stringify(updateData)
			};
		};
	
		const config = configGetter({}, updateData);
		
		

	
		try {
			const result = await fetch(`http://127.0.0.1:8080/api/v1/customer/${customer_id}`, config);
			const data = await result.json();
	
			// แสดงผลการตอบกลับจาก API เพื่อการตรวจสอบ
			console.log('การตอบกลับจาก API:', data);
	
			if (data.status_code != 201 && data.status_code != 200) {
				console.error('อัปเดตลูกค้าไม่สำเร็จ:', data);
				return fail(400, {
					message: 'อัปเดตลูกค้าไม่สำเร็จ'
				});
			}
	
			console.log('อัปเดตลูกค้าสำเร็จ:', data);
			return {
				result: data.result,
				success: true
			};
		} catch (error) {
			console.error('เกิดข้อผิดพลาดในการอัปเดตลูกค้า:', error);
			return fail(500, {
				message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด'
			});
		}
	},
	
	
	
	
	
	
	
} ;






