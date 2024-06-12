/**
 * @typedef {Object} AdminPermissiomData
 * @property {number} id
 * @property {string} MenuPermission
 * @property {string} RoleName
 * @property {number} admin_id
 * 
 */



/**
 * @typedef {Object} Result
 * @property {AdminPermissiomData} adminpermission_data
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
			`http://127.0.0.1:8080/api/v1/adminpermission/getall/getallpermission`
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