<script>
	/**
	 * @typedef {Object} FileData
	 * @property {string} file_name
	 * @property {string} file_data
	 * @property {string} file_type
	 */

	import FileDropzone from './../../../../../components/FileDropzone.svelte';
	import Model from '../../../../../components/Model.svelte';
	import ProductCategoryManagementTable from './(component)/ProductCategoryManagementTable.svelte';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	let colLabels = ['#', 'รหัสหมวดหมู่', 'ชื่อหมวดหมู่', 'รายละเอียด', 'สถานะ', 'Title'];

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	let rowRecordMapper = writable(
		data.product_category.map((item, index) => {
			if (item) {
				return [
					index + 1,
					`CAT000-${item.id}`,
					item.name,
					item.detail ?? '-',
					item.status ? 'ใช้งาน' : 'ปิดการใช้งาน'
				];
			}
		})
	);
</script>

<div id="product-managment-container" class="container-fluid mb-4">
	<div class="d-flex justify-content-between align-items-center">
		<span class="fs-2 fw-bold">สินค้า</span>

		<button
			type="button"
			class="btn btn-primary btn-sm px-3 py-2"
			data-bs-toggle="modal"
			data-bs-target="#modal-product-target"
		>
			เพิ่มสินค้า
		</button>
		<Model modalTargetId={`modal-product-target`} modalTitle="เพิ่มสินค้า">
			<form
				action="?/createProductCategory"
				method="POST"
				use:enhance={({ formData }) => {
					let status = formData.get('status');
					if (status) {
						formData.set('status', status === 'on' ? '1' : '0');
					} else {
						formData.set('status', '0');
					}

					formData.append('store_id', data.store_account.store_data.id.toString());

					return async ({ result }) => {
						if (result.type === 'success') {
							Swal.fire({
								title: 'สำเร็จ',
								text: 'เพิ่มสินค้าสำเร็จ',
								icon: 'success'
							}).then(() => {
								location.reload();
							});
						}

						if (result.type === 'failure') {
							Swal.fire({
								title: 'ทำรายการไม่สำเร็จ',
								text: 'เพิ่มสินค้าไม่สำเร็จโปรดลองใหม่อีกครั้ง',
								icon: 'error'
							}).then(() => {
								location.reload();
							});
						}
					};
				}}
				style="font-size: 0.85rem"
				class="form-floating container d-flex flex-column gap-4"
			>
				<div class=" input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productName" class="col-2 form-label">ชื่อหมวดหมู่</label>
					<input
						name="name"
						type="text"
						class="col form-control"
						id="productName"
						placeholder="placeholder"
					/>
				</div>

				<div class="input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productDetails" class="col-2 form-label">รายละเอียด</label>
					<textarea
						name="detail"
						class="form-control col"
						rows="6"
						id="productDetails"
						cols="30"
						placeholder="placeholder"
					></textarea>
				</div>
				<div class="input-group input-group-sm row me-2 align-items-center">
					<label class="col-2 form-check-label" for="productActive">ใช้งาน</label>

					<div class="col fs-3 form-check form-switch">
						<input name="status" class=" form-check-input" type="checkbox" id="productActive" />
					</div>
				</div>
				<div class="modal-footer">
					<button data-bs-dismiss="modal" type="submit" class="btn btn-sm py-2 px-4 btn-primary"
						>บันทึก</button
					>
					<button
						type="button"
						class="btn btn-sm py-2 px-4 btn-outline-primary"
						data-bs-dismiss="modal">ยกเลิก</button
					>
				</div>
			</form>
		</Model>
	</div>
	<!-- TODO: ตัวอย่างการนำไปใช้  -->
	<ProductCategoryManagementTable
		store_id={data.store_account.store_data.id}
		productCate={data.product_category}
		rowStoreRecords={rowRecordMapper}
		actionSelects={['EDIT', 'DELETE']}
		{colLabels}
	></ProductCategoryManagementTable>
	<!-- <DataTable /> -->
</div>
