<script>
	/**
	 * @typedef {Object} FileData
	 * @property {string} file_name
	 * @property {string} file_data
	 * @property {string} file_type
	 */

	import FileDropzone from './../../../../../components/FileDropzone.svelte';
	import Model from '../../../../../components/Model.svelte';
	import ProductManagementTable from './(component)/ProductManagementTable.svelte';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	let colLabels = [
		'#',
		'รูปภาพ',
		'รหัสสินค้า',
		'ชื่อสินค้า',
		'หมวดหมู่',
		'ราคา',
		'จำนวนในสต๊อก',
		'สถานะ'
	];

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	let rowRecordMapper = writable(
		data.products.map((item, index) => {
			if (item.product_data) {
				const d = item.product_data;

				return [
					index + 1,
					item.files_data.length > 0
						? `http://${item.files_data[0].file_data}`
						: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
					`PROD000-${d.id}`,
					d.name,
					item.product_category_data.name,
					item.product_data.price,
					item.product_data.stock,
					item.product_data.status ? 'ใช้งาน' : 'ปิดการใช้งาน'
				];
			}
		})
	);

	$: tableData = null;

	// $: {
	// 	if (form?.result) {
	// 		const newProd = () => {
	// 			const obj = form?.result;
	// 			return {
	// 				'#': rowRecordMapper.length + 1,
	// 				รูปภาพ:
	// 					obj.files_data.length > 0
	// 						? `http://${obj.files_data[0].file_data}`
	// 						: 'http://127.0.0.1:8080/public/image/d0ef349790a0216f8fcc6a73bb74c6a1f02b0a52c75d879ca8ae1e231eddb8fc.jpg',
	// 				ชื่อสินค้า: `PROD000${obj.product_data.id}`,
	// 				รหัสสินค้า: obj.product_data.name,
	// 				หมวดหมู่: form?.result.product_category_data.name,
	// 				ราคา: form?.result.product_data.price,
	// 				จำนวนในสต๊อก: form?.result.product_data.stock,
	// 				สถานะ: form?.result.product_data.status ? 'ใช้งาน' : 'ปิดการใช้งาน'
	// 			};
	// 		};

	// 		tableData.row.add(newProd()).draw();

	// 		console.log('newProd', newProd());
	// 	}
	// }

	/** @type {FileData[]} */
	$: imagesPreview = [];
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
				action="?/createProduct"
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
							});
						}

						if (result.type === 'failure') {
							Swal.fire({
								title: 'ทำรายการไม่สำเร็จ',
								text: 'เพิ่มสินค้าไม่สำเร็จโปรดลองใหม่อีกครั้ง',
								icon: 'error'
							});
						}
						location.reload();
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
					<label for="productName" class="col-2 form-label">ชื่อสินค้า</label>
					<input
						name="name"
						type="text"
						class="col form-control"
						id="productName"
						placeholder="placeholder"
					/>
				</div>
				<div class="input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productCategory" class="col-2 form-label">หมวดหมู่</label>
					<select name="category_id" class="form-select col" id="productCategory">
						{#each data.product_category as item}
							<option value={item.id}>{item.name}</option>
						{/each}
					</select>
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
				<div class="input-group input-group-sm row me-2 align-items-center gap-2">
					<label for="productPrice" class="col-2 form-label">ราคา</label>
					<input
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
	<ProductManagementTable
		productImages={data.products.map((item) => {
			return item.files_data;
		})}
		store_id={data.store_account.store_data.id}
		bind:table={tableData}
		productCate={data.product_category}
		rowStoreRecords={rowRecordMapper}
		actionSelects={['EDIT', 'DELETE']}
		{colLabels}
	></ProductManagementTable>
	<!-- <DataTable /> -->
</div>
