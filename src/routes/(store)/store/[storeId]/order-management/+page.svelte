<script>
	import { writable } from 'svelte/store';
	import OrderManagementTable from './(component)/OrderManagementTable.svelte';

	let colLabels = [
		'#',
		'รหัสการสั่งซื้อ',
		'ชื่อผู้ซื้อ',
		'ยอดรวม',
		'วันเวลาที่ซื้อ',
		'สถานะ',
		'Title'
	];

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	/**
	 * @param {Date} date
	 */
	function formatDate(date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear() + 543;
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${day}/${month}/${year} - ${hours}:${minutes}`;
	}

	const OrderState = {
		PENDING: 'รับออร์เดอร์แล้ว',
		PREPARED: 'เตรียมสินค้า',
		SEND: 'อยู่ระหว่างส่งสินค้า',
		SUCCEED: 'รับสินค้าแล้ว',
		REJECTED: 'ยกเลิกออร์เดอร์'
	};

	let rowRecordMapper = writable(
		data.result.map((item, index) => {
			if (item.order_data) {
				return [
					index + 1,
					`BILL000-${item.order_data.id}`,
					item.customer_data.name,
					item.order_data.total_amount,
					formatDate(new Date(item.order_data.created_at)),
					OrderState[item.order_data.state]
				];
			}
		})
	);

	/** @type {FileData[]} */
	$: imagesPreview = [];
</script>

<div id="product-managment-container" class="container-fluid mb-4">
	<div class="d-flex justify-content-between align-items-center">
		<span class="fs-2 fw-bold">รายการสั่งซื้อ</span>

		<button
			type="button"
			class="btn btn-primary btn-sm px-3 py-2"
			data-bs-toggle="modal"
			data-bs-target="#modal-product-target"
		>
			ส่งออก Excel
		</button>
	</div>
	<!-- TODO: ตัวอย่างการนำไปใช้  -->
	<OrderManagementTable
		store_id={data.store_account.store_data.id}
		rowStoreRecords={rowRecordMapper}
		{colLabels}
	></OrderManagementTable>
	<!-- <DataTable /> -->
</div>
