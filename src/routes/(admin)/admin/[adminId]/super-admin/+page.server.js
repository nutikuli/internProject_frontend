/**
 * @typedef {Object} AdminData
 * @property {number} id
 * @property {string} name
 * @property {string} password
 * @property {string} phone
 * @property {string} location
 * @property {string} email
 * @property {string} image_avatar
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} role
 * @property {string} permissionId
 * @property {boolean} status
 * @property {number} admin_id
 * 
 */



/**
 * @typedef {Object} Result
 * @property {AdminData} admin_data
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

export const load = async (event) => {
	try {
		const adminsId = event.params.adminId;
		if (!adminsId) {
			throw fail(400, {
				message: 'ไม่สามารถดึงข้อมูลแอดมินได้'
			});
		}

		const response = await fetch(
			`http://127.0.0.1:8080/api/v1/admin/getalladmin`
		);

		if (!response.ok) {
			// บันทึกสถานะและข้อความการตอบกลับเพื่อการดีบัก
			const errorText = await response.text();
			console.error('การตอบกลับไม่ถูกต้อง:', response.status, errorText);
			throw new Error('ไม่สามารถดึงข้อมูลแอดมินได้');
		}

		/** @type {DtoResponse} */
		const Admin = await response.json();

		return {
			...Admin
		};
	} catch (error) {
		// บันทึกข้อผิดพลาดเพื่อการดีบัก
		console.error('ข้อผิดพลาดในการดึงข้อมูลแอดมิน:', error);
		throw fail(error.status || 500, {
			message: error.message || 'ไม่สามารถดึงข้อมูลแอดมินได้'
		});
	}
};


export const actions = {
	registeradmin: async ({ request }) => {
		console.log('createAdmin');
		const { name,phone,email, password } = Object.fromEntries(await request.formData());
		let surname = ""
		const formData = new FormData();
		
		formData.append('name',name +" "+surname)
        formData.append('phone',phone)
		formData.append('email', email);
		formData.append('password', password);
		formData.append('role', "ADMIN")
		formData.append('status', "true")
      

		console.log('checking login');
		console.log('email,pass:', email, '  ', password);
        console.log('name=====>',name)
        console.log('phone=====>',phone)
        console.log('email=====>',email)
        console.log('password=====>',password)
        
   

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
        
	} ,
	deleteAdmin: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
	
		// แสดงค่า formData ทั้งหมด
		console.log('Form Data:', formData);
	
		const { admin_id } = formData;
	
		// แสดงค่า customer_id เพื่อการตรวจสอบ
		console.log('รหัสผู้แล:', admin_id);
	
		// ตรวจสอบว่ารหัสลูกค้ามีค่า
		if (!admin_id) {
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
			const result = await fetch(`http://127.0.0.1:8080/api/v1/admin/${admin_id}`, config);
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



}