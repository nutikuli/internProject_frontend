<script>
	import Icon from '@iconify/svelte';
	import Model from '../../../../../components/Model.svelte';
	import Table from '../../../../../components/Table.svelte';

	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	export let colLabels = [
		'#',
		'รหัสการสั่งซื้อ',
		'ชื่อผู้ซื้อ',
		'ยอดรวม',
		'วันเวลาที่ซื้อ',
		'สถานะ',
		'Title'
	];

	// สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
	/** @type {string[][]} */
	export let rowRecords = [
		['BILL0001', 'ตัวอย่าง ชื่อนามสกุล', '1,000', '27/02/2567 - 18:46', 'รับออร์เดอร์แล้ว'],
		['BILL0002', 'ตัวอย่าง ชื่อนามสกุล', '15,000', '27/02/2567 - 18:46', 'รับออร์เดอร์แล้ว'],
		['BILL0003', 'ตัวอย่าง ชื่อนามสกุล', '5,000', '27/02/2567 - 18:46', 'เตรียมสินค้า'],
		['BILL0004', 'ตัวอย่าง ชื่อนามสกุล', '25,000', '27/02/2567 - 18:46', 'เตรียมสินค้า'],
		['BILL0005', 'ตัวอย่าง ชื่อนามสกุล', '38,000', '27/02/2567 - 18:46', 'อยู่ระหว่างส่งสินค้า'],
		['BILL0006', 'ตัวอย่าง ชื่อนามสกุล', '1,500', '27/02/2567 - 18:46', 'อยู่ระหว่างส่งสินค้า'],
		['BILL0007', 'ตัวอย่าง ชื่อนามสกุล', '500', '27/02/2567 - 18:46', 'รับสินค้าแล้ว'],
		['BILL0008', 'ตัวอย่าง ชื่อนามสกุล', '1,500', '27/02/2567 - 18:46', 'รับสินค้าแล้ว'],
		['BILL0009', 'ตัวอย่าง ชื่อนามสกุล', '38,000', '27/02/2567 - 18:46', 'ยกเลิกออร์เดอร์'],
		['BILL0010', 'ตัวอย่าง ชื่อนามสกุล', '1,000', '27/02/2567 - 18:46', 'ยกเลิกออร์เดอร์']
	];

	function badgeStatus(status) {
		if (status[0] === 'รับออร์เดอร์แล้ว') {
			return 'badge bg-warning';
		} else if (status[0] === 'เตรียมสินค้า') {
			return 'badge bg-info';
		} else if (status[0] === 'อยู่ระหว่างส่งสินค้า') {
			return 'badge bg-primary';
		} else if (status[0] === 'รับสินค้าแล้ว') {
			return 'badge bg-success';
		} else if (status[0] === 'ยกเลิกออร์เดอร์') {
			return 'badge bg-danger';
		}
	}
</script>

<div class="d-flex" style="padding-top:40px;">
	<h2 style="font-weight: 700; margin-right:20px;">รายการสั่งซื้อ</h2>
	<select class="me-3" id="input" style="width: 200px; height: 35px">
		<option selected>--select--</option>
		<option value="1">รับออร์เดอร์แล้ว</option>
		<option value="2">เตรียมสินค้า</option>
		<option value="3">อยู่ระหว่างส่งสินค้า</option>
		<option value="4">รับสินค้าแล้ว</option>
		<option value="5">ยกเลิกออร์เดอร์</option>
	</select>
	<div class="ms-auto">
		<button class="btn btn-primary" type="button">ส่งออก Excel</button>
	</div>
</div>

<Table {rowRecords} actionSelects={["VIEW"]} {colLabels}>
	<div slot="view-action">
		<form action="">
			<!-- form elements goes hese -->
			<div class="modal-footer">
				<!-- ปุ่ม actions -->
				<button type="button" class="btn btn-primary">ปิดหน้าต่าง</button>
			</div>
		</form>
	</div>
</Table>



<style>
	.search {
		padding-bottom: 15px;
	}
	.table-c-primary {
		background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
	}
	.table-striped > tbody > tr:nth-child(2n + 1) > td,
	.table-striped > tbody > tr:nth-child(2n + 1) > th {
		background-color: rgba(#f8f9fa, 0.5);
	}
	.text-left {
		text-align: left;
	}
	.text-right {
		text-align: right;
	}
	.text-center {
		text-align: center;
	}
</style>
