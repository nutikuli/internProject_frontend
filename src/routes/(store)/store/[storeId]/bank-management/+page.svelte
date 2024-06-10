<script>
	/**
	 * @typedef {Object} FileData
	 * @property {string} file_name
	 * @property {string} file_data
	 * @property {string} file_type
	 */

	import FileDropzone from './../../../../../components/FileDropzone.svelte';
	import Model from '../../../../../components/Model.svelte';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { writable } from 'svelte/store';
	import BankManagementTable from './(component)/BankManagementTable.svelte';

	let colLabels = [
		'#',
		'รูปภาพ',
		'รหัสธนาคาร',
		'ชื่อธนาคาร',
		'เลขบัญชี',
		'ชื่อบัญชี',
		'สถานะ',
		'Title'
	];

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	let rowRecordMapper = writable(
		data.bankResult.map((item, index) => {
			if (item.bank_data) {
				return [
					index + 1,
					item.files_data.length > 0
						? `http://${item.files_data[0].file_data}`
						: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
					`BK000-${item.bank_data.id}`,
					item.bank_data.name,
					item.bank_data.acc_number,
					item.bank_data.acc_name,
					item.bank_data.status ? 'ใช้งาน' : 'ปิดการใช้งาน'
				];
			}
		})
	);

	/** @type {FileData[]} */
	$: imagesPreview = [];
</script>

<div id="product-managment-container" class="container-fluid mb-4">
	<div class="d-flex justify-content-between align-items-center">
		<span class="fs-2 fw-bold">ธนาคาร</span>

		<button
			type="button"
			class="btn btn-primary btn-sm px-3 py-2"
			data-bs-toggle="modal"
			data-bs-target="#modal-product-target"
		>
			เพิ่มธนาคาร
		</button>
		<Model modalTargetId={`modal-product-target`} modalTitle="เพิ่มธนาคาร">
			<form
				action="?/createBank"
				method="POST"
				use:enhance={({ formData }) => {
					let status = formData.get('status');
					if (status) {
						formData.set('status', status === 'on' ? '1' : '0');
					} else {
						formData.set('status', '0');
					}

					formData.append('files_data', JSON.stringify(imagesPreview));
					formData.append('store_id', data.store_account.store_data.id.toString());

					return async ({ result }) => {
						if (result.type === 'success') {
							imagesPreview = [];
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
				<input
					hidden
					value={imagesPreview}
					name="files_data"
					type="number"
					class="col form-control"
					id="storeId"
				/>
				<FileDropzone bind:imageFilesData={imagesPreview} />
				<div class=" input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productName" class="col-2 form-label">ชื่อธนาคาร</label>
					<input
						name="name"
						type="text"
						class="col form-control"
						id="productName"
						placeholder="placeholder"
					/>
				</div>
				<div class="input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productDetails" class="col-2 form-label">เลขบัญชี</label>
					<input
						name="acc_number"
						class="form-control col"
						id="productDetails"
						type="text"
						placeholder="placeholder"
					/>
				</div>
				<div class="input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productPrice" class="col-2 form-label">ชื่อบัญชี</label>
					<input
						name="acc_name"
						type="text"
						class="form-control col"
						id="productPrice"
						placeholder="placeholder"
					/>
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
	<BankManagementTable
		productImages={data.bankResult.map((item) => {
			return item.files_data;
		})}
		store_id={data.store_account.store_data.id}
		rowStoreRecords={rowRecordMapper}
		actionSelects={['EDIT', 'DELETE']}
		{colLabels}
	></BankManagementTable>
	<!-- <DataTable /> -->
</div>
