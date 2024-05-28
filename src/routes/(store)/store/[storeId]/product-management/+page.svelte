<script>
	import FileDropzone from './../../../../../components/FileDropzone.svelte';
	import Model from '../../../../../components/Model.svelte';
	import Table from '../../../../../components/Table.svelte';
	import Icon from '@iconify/svelte';

	let colLabels = ['#', 'ลำดับงาน', 'เมนูที่เข้าถึงได้', 'หมวดหมู่', 'สถานะ', 'Actions'];

	// สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
	/** @type {string[][]} */
	export let rowRecords = [
		['ผู้บังคับบัญชา', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ใช้งาน'],
		['เจ้าหน้าที่', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ใช้งาน'],
		['พนักงานบัญชี', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ใช้งาน'],
		['คนขับ', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดการใช้งาน'],
		['ผู้อำนวยการ', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ใช้งาน'],
		['พัฒนาบุคคลากร', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ใช้งาน'],
		['โปรแกรมเมอร์', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ใช้งาน'],
		['ผู้บริหาร', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน'],
		['พนักงานทั่วไป', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน'],
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน'],
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน'],
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน']
	];
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
			<form class="form-floating container my-4 d-flex flex-column gap-4">
				<div class="row me-2 align-items-center gap-2">
					<label for="productImage" class="form-label col-2">รูปภาพ </label>
					<div class="col">
						<div class="d-flex gap-4 align-items-center">
							<img
								sizes="32"
								src="https://via.placeholder.com/100"
								class="img-thumbnail"
								alt="Product Image"
								id="productImagePreview"
							/>
							<FileDropzone />
						</div>
					</div>
				</div>
				<div class=" row me-2 align-items-center gap-2">
					<label for="productName" class="col-2 form-label">ชื่อสินค้า</label>
					<input type="text" class="col form-control" id="productName" placeholder="placeholder" />
				</div>
				<div class=" row me-2 align-items-center gap-2">
					<label for="productCategory" class="col-2 form-label">หมวดหมู่</label>
					<select class="form-select col" id="productCategory">
						<option selected>-- select --</option>
						<!-- Add options here -->
					</select>
				</div>
				<div class=" row me-2 align-items-center gap-2">
					<label for="productDetails" class="col-2 form-label">รายละเอียด</label>
					<textarea
						class="form-control col"
						rows="6"
						id="productDetails"
						cols="30"
						placeholder="placeholder"
					></textarea>
				</div>
				<div class=" row me-2 align-items-center gap-2">
					<label for="productPrice" class="col-2 form-label">ราคา</label>
					<input type="text" class="form-control col" id="productPrice" placeholder="placeholder" />
				</div>
				<div class=" row me-2 align-items-center gap-2">
					<label for="productQuantity" class="col-2 form-label">จำนวนในสต็อก</label>
					<input
						type="text"
						class="form-control col"
						id="productQuantity"
						placeholder="placeholder"
					/>
				</div>
				<div class="row me-2 align-items-center">
					<label class="col-2 form-check-label" for="productActive">ใช้งาน</label>

					<div class="col fs-3 form-check form-switch">
						<input class=" form-check-input" type="checkbox" id="productActive" />
					</div>
				</div>
			</form>
		</Model>
	</div>
	<!-- TODO: ตัวอย่างการนำไปใช้  -->
	<Table {rowRecords} actionSelects={["EDIT", "VIEW", "DELETE"]} {colLabels}>
		<div slot="editor-action">
			<form action="">
				<!-- form elements goes hese -->
				<div class="modal-footer">
					<!-- ปุ่ม actions -->
					<button type="button" class="btn btn-primary">บันทึก</button>
					<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
						>ยกเลิก</button
					>
				</div>
			</form>
		</div>
		<div slot="delete-action">
			<form action="">
				<!-- form elements goes hese -->
				<div class="modal-footer">
					<!-- ปุ่ม actions -->
					<button type="button" class="btn btn-primary">บันทึก</button>
					<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
						>ยกเลิก</button
					>
				</div>
			</form>
		</div>
		<div slot="view-action">
			<form action="">
				<!-- form elements goes hese -->
				<div class="modal-footer">
					<!-- ปุ่ม actions -->
					<button type="button" class="btn btn-primary">บันทึก</button>
					<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
						>ยกเลิก</button
					>
				</div>
			</form>
		</div>
	</Table>
</div>
