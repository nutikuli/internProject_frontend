<script>
	import Table from '../../../../../components/Table.svelte';
</script>

<div id="product-managment-container" class="container-fluid">
	<div class="d-flex justify-content-between align-items-center">
		<span class="fs-2 fw-bold">รายการธุรกรรม</span>
		<button
			type="button"
			class="btn btn-primary  px-3 py-2"
			data-bs-toggle="modal"
			data-bs-target="#exampleModal"
		>
			เพิ่มรายการธุรกรรม
		</button>
	</div>
	<Table></Table>
</div>
