<script>
	import Icon from '@iconify/svelte';
	import Model from '../../../../../components/Model.svelte';

	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	export let colLabels = ['#', 'รหัสการสั่งซื้อ', 'ชื่อผู้ซื้อ', 'ยอดรวม', 'วันเวลาที่ซื้อ', 'สถานะ', 'Title'];

	// สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
	/** @type {string[][]} */
	export let rowRecords = [
		['BILL0001', 'ตัวอย่าง ชื่อนามสกุล', '1,000', '27/02/2567 - 18:46', 'รับออร์เดอร์แล้ว'],
		['BILL0002', 'ตัวอย่าง ชื่อนามสกุล', '15,000', '27/02/2567 - 18:46', 'รับออร์เดอร์แล้ว'],
		['BILL0003', 'ตัวอย่าง ชื่อนามสกุล', '5,000', '27/02/2567 - 18:46', 'เตรียมสินค้า',],
		['BILL0004', 'ตัวอย่าง ชื่อนามสกุล', '25,000', '27/02/2567 - 18:46', 'เตรียมสินค้า',],
		['BILL0005', 'ตัวอย่าง ชื่อนามสกุล', '38,000', '27/02/2567 - 18:46', 'อยู่ระหว่างส่งสินค้า',],
		['BILL0006', 'ตัวอย่าง ชื่อนามสกุล', '1,500', '27/02/2567 - 18:46', 'อยู่ระหว่างส่งสินค้า',],
		['BILL0007', 'ตัวอย่าง ชื่อนามสกุล', '500', '27/02/2567 - 18:46', 'รับสินค้าแล้ว',],
		['BILL0008', 'ตัวอย่าง ชื่อนามสกุล', '1,500', '27/02/2567 - 18:46', 'รับสินค้าแล้ว',],
		['BILL0009', 'ตัวอย่าง ชื่อนามสกุล', '38,000', '27/02/2567 - 18:46', 'ยกเลิกออร์เดอร์',],
		['BILL0010', 'ตัวอย่าง ชื่อนามสกุล', '1,000', '27/02/2567 - 18:46', 'ยกเลิกออร์เดอร์',]
	];

	function badgeStatus(status) {
        if (status[0] === 'รับออร์เดอร์แล้ว') {
            return 'badge bg-warning';
        } 
		else if (status[0] === 'เตรียมสินค้า'){
            return 'badge bg-info';
        }
        else if (status[0] === 'อยู่ระหว่างส่งสินค้า'){
            return 'badge bg-primary';
        }
        else if (status[0] === 'รับสินค้าแล้ว'){
            return 'badge bg-success';
        }
        else if (status[0] === 'ยกเลิกออร์เดอร์'){
            return 'badge bg-danger';
        }
	}

    
</script>

<h2 style="font-weight: 700; padding-top:40px;">รายการสั่งซื้อ</h2>
<form class="search d-flex align-items-center w-100" role="search">
    <input class="me-3" type="search" placeholder="Search" aria-label="Search" style="width: 200px;"/>
    <select class="me-3" id="input" style="width: 200px;">
        <option selected>--select--</option>
        <option value="1">รับออร์เดอร์แล้ว</option>
        <option value="2">เตรียมสินค้า</option>
        <option value="3">อยู่ระหว่างส่งสินค้า</option>
        <option value="4">รับสินค้าแล้ว</option>
        <option value="5">ยกเลิกออร์เดอร์</option>
    </select>
    <button class="btn btn-primary me-3" type="submit">ค้นหา</button>
    <button class="btn btn-outline-primary me-3" type="button">ล้างค่าค้นหา</button>
    <div class="ms-auto">
        <button class="btn btn-primary" type="button">ส่งออก Excel</button>
    </div>
</form>

<table class="table text-center table-striped">
	<thead class="table-c-primary">
		<tr>
			{#each colLabels as c}
				<th class="text-light px-4 bg-primary" scope="col">{c}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rowRecords as record, index}
			<tr>
				<td>{index}</td>
				{#each record.slice(0, -1) as cell}
					<td>{cell}</td>
				{/each}
				
				<td>
					<span class={badgeStatus(record.slice(-1))}>{record.slice(-1)}</span>
				</td>

                <td class="table-titles">
					<button
						data-bs-toggle="modal"
						data-bs-target={`#modal-view-${index}`}
						class="viewBtn btn btn-sm "
						><Icon width="16" icon="fa-solid:eye" color="#0D6EFD"/></button
                        
					>
					<Model modalTargetId={`modal-editor-${index}`} modalTitle={'แก้ไขข้อมูล'} />
				</td>
				
			</tr>
		{/each}
	</tbody>
</table>

<style>
    .search{
        padding-bottom: 15px;
    }

	.table-c-primary {
		background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
	}

	.table-striped > tbody > tr:nth-child(2n + 1) > td,
	.table-striped > tbody > tr:nth-child(2n + 1) > th {
		background-color: rgba(#f8f9fa, 0.5);
	}

    .viewBtn{
        background-color: #9EC5FE;
    }
</style>