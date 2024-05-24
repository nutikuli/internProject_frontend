<!-- ก๊อปเอาไปดัดแปลงใช้ได้เลย  -->

<script>
	import Icon from '@iconify/svelte';
	import Model from './Model.svelte';
	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	export let colLabels = ['#', 'ลำดับงาน', 'เมนูที่เข้าถึงได้', 'หมวดหมู่', 'สถานะ', 'Actions'];

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
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน']
	];

	const editRow = (index) => {
		alert(`Edit row ${index + 1}`);
	};

	const deleteRow = (index) => {
		alert(`Delete row ${index + 1}`);
	};

	function badgeStatus(status) {
		return status[0] === 'ใช้งาน' ? 'badge bg-success' : 'badge bg-danger';
	}
</script>

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
				<!--- สำหรับใช้กับ "สถานะ" ไม่ส่วนนี้ลบทึ้ง -->
				<td>
					<span class={badgeStatus(record.slice(-1))}>{record.slice(-1)}</span>
				</td>
				<td class="table-actions">
					<button
						data-bs-toggle="modal"
						data-bs-target={`#modal-editor-${index}`}
						class="btn btn-outline-warning btn-sm"
						><Icon width="16" icon="material-symbols:edit-square-outline" /></button
					>
					<Model modalTargetId={`modal-editor-${index}`} modalTitle={'แก้ไขข้อมูล'} />

					<button
						data-bs-toggle="modal"
						data-bs-target={`#modal-delete-${index}`}
						class="btn btn-outline-danger btn-sm"
					>
						<Icon width="16" icon="material-symbols:delete" />
					</button>

					<Model modalTargetId={`modal-delete-${index}`} modalTitle={'ลบข้อมูล'} />
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table-c-primary {
		background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
	}

	.table-striped > tbody > tr:nth-child(2n + 1) > td,
	.table-striped > tbody > tr:nth-child(2n + 1) > th {
		background-color: rgba(#f8f9fa, 0.5);
	}
</style>
