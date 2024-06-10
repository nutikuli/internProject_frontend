<script>
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import FileDropzone from '../../../../../../components/FileDropzone.svelte';

	import Model from '../../../../../../components/Model.svelte';
	import axios from 'axios';

	/**
	 * @typedef {Object} Props
	 * @property {FileData[]} imageFilesData - The data for the image files.
	 * @property {number} index - The index.
	 * @property {string} store_id - The ID of the store.
	 * @property {string} product_id - The ID of the product.
	 * @property {ProductCategoryData[]} productCate - The product categories data.
	 * @property {string[]} record - The record[0].
	 */

	async function imageUrlToBase64(url) {
		const response = await axios.get(url, {
			responseType: 'arraybuffer'
		});
		const base64 = btoa(
			new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
		);
		return base64;
	}

	function isBase64(str) {
		const regex = /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
		return regex.test(str);
	}

	/** @type {Props} */
	export let props;
</script>

<Model modalTargetId={`modal-editor-${props.index}`} modalTitle={'แก้ไขข้อมูล'}>
	<form
		action="?/updateProduct"
		method="POST"
		use:enhance={async ({ formData }) => {
			let status = formData.get('status');
			if (status) {
				formData.set('status', status === 'on' ? '1' : '0');
			} else {
				formData.set('status', '0');
			}

			const images = await Promise.all(
				props.imageFilesData.map(async (image) => {
					if (isBase64(image.file_data)) {
						return {
							file_name: image.file_name,
							file_type: image.file_type,
							file_data: image.file_data
						};
					} else {
						return {
							file_name: image.file_name,
							file_type: image.file_type,
							file_data: await imageUrlToBase64(`http://${image.file_data}`)
						};
					}
				})
			);

			console.log(images);

			formData.append('files_data', JSON.stringify(images));
			formData.append('store_id', props.store_id);
			formData.append('product_id', props.product_id);

			console.log(props.product_id);

			return async ({ result }) => {
				if (result.type === 'success') {
					Swal.fire({
						title: 'สำเร็จ',
						text: 'แก้ไขสินค้าสำเร็จ',
						icon: 'success'
					});
				}

				if (result.type === 'failure') {
					Swal.fire({
						title: 'ทำรายการไม่สำเร็จ',
						text: 'อัปเดตสินค้าไม่สำเร็จโปรดลองใหม่อีกครั้ง',
						icon: 'error'
					});
				}
				location.reload();
			};
		}}
		style="font-size: 0.85rem"
		class="form-floating container d-flex flex-column gap-4"
	>
		<!-- content here -->
		<FileDropzone bind:imageFilesData={props.imageFilesData} />
		<div class=" input-group input-group-sm row me-2 align-items-center gap-2">
			<label for="productName" class="col-2 form-label">ชื่อสินค้า</label>
			<input
				name="name"
				value={props.record[3]}
				type="text"
				class="col form-control"
				id="productName"
				placeholder="placeholder"
			/>
		</div>
		<div class="input-group input-group-sm row me-2 align-items-center gap-2">
			<label for="productCategory" class="col-2 form-label">หมวดหมู่</label>
			<select name="category_id" class="form-select col" id="productCategory">
				{#each props.productCate as item}
					<option value={item.id}>{item.name}</option>
				{/each}
			</select>
		</div>
		<div class="input-group input-group-sm row me-2 align-items-center gap-2">
			<label for="productDetails" class="col-2 form-label">รายละเอียด</label>
			<textarea
				value={props.record[4]}
				name="detail"
				class="form-control col"
				rows="6"
				id="productDetails"
				cols="30"
				placeholder="placeholder"
			></textarea>
		</div>
		<div class="input-group input-group-sm row me-2 align-items-center gap-2">
			<label for="productPrice" class="col-2 form-label">ราคา</label>
			<input
				value={props.record[5]}
				name="price"
				type="number"
				class="form-control col"
				id="productPrice"
				placeholder="placeholder"
			/>
		</div>
		<div class="input-group input-group-sm row me-2 align-items-center gap-2">
			<label for="productQuantity" class="col-2 form-label">จำนวนในสต็อก</label>
			<input
				value={props.record[6]}
				name="stock"
				type="number"
				class="form-control col"
				id="productQuantity"
				placeholder="placeholder"
			/>
		</div>
		<div class="input-group input-group-sm row me-2 align-items-center">
			<label class="col-2 form-check-label" for="productActive">ใช้งาน</label>

			<div class="col fs-3 form-check form-switch">
				<input
					checked={props.record[7] === 'ใช้งาน'}
					name="status"
					class=" form-check-input"
					type="checkbox"
					id="productActive"
				/>
			</div>
		</div>
		<div class="modal-footer">
			<button data-bs-dismiss="modal" type="submit" class="btn btn-sm py-2 px-4 btn-primary"
				>บันทึก</button
			>
			<button type="button" class="btn btn-sm py-2 px-4 btn-outline-primary" data-bs-dismiss="modal"
				>ยกเลิก</button
			>
		</div>
	</form>
</Model>
