<script>
	import FileDropzone from '../../../../../components/FileDropzone.svelte';
	import Model from '../../../../../components/Model.svelte';
	import Table from '../../../../../components/Table.svelte';
</script>

<div id="product-managment-container" class="container-fluid">
	<div class="d-flex justify-content-between align-items-center">
		<span class="fs-2 fw-bold">หมวดหมู่</span>
		<button
			type="button"
			class="btn btn-primary px-3 py-2"
			data-bs-toggle="modal"
			data-bs-target="#modal-product-cate-target"
		>
			เพิ่มหมวดหมู่
		</button>
		<Model modalTargetId={`modal-product-cate-target`} modalTitle="เพิ่มหมวดหมู่">
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
	<Table></Table>
</div>
