<!-- ก๊อปเอาไปดัดแปลงใช้ได้เลย  -->

<script>
	import Icon from '@iconify/svelte';
	import Model from './Model.svelte';
	import { onMount } from 'svelte';
	import DataTable from 'datatables.net-dt';

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
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน'],
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน'],
		['พนักงานชั่วคราว', 'แอดมิน, มาตรา, ผู้บังคับบัญชา, สมาชิค, Log', 'AS', 'ปิดใช้งาน']
	];

	export let tableTarget = 'table-data';

	const editRow = (index) => {
		alert(`Edit row ${index + 1}`);
	};

	const deleteRow = (index) => {
		alert(`Delete row ${index + 1}`);
	};

	function badgeStatus(status) {
		return status[0] === 'ใช้งาน' ? 'badge bg-success' : 'badge bg-danger';
	}

	function clear() {
		const inputElement = document.querySelector('.dt-input');
		if (inputElement) {
			// @ts-ignore
			inputElement.value = '';
		}
	}

	function onLoadCustomPaginationStyle() {
		const dtPagingDiv = document.querySelector('.dt-paging.paging_full_numbers');
		if (dtPagingDiv) {
			dtPagingDiv.classList.add('pagination');

			const buttons = dtPagingDiv.querySelectorAll('button');
			buttons.forEach((button) => {
				const aTag = document.createElement('a');
				aTag.className = 'page-link';
				aTag.textContent = button.textContent;

				button.className = 'page-item btn btn-outline m-0 p-0';
				button.textContent = '';
				button.addEventListener('click', onLoadCustomPaginationStyle);

				button.appendChild(aTag);

				if (button.getAttribute('aria-current') === 'page') {
					button.classList.add('active');
				}
			});
		}
	}

	function tableTriggerEvent(table) {
		table.on('search.dt', function () {
			setTimeout(() => {
				onLoadCustomPaginationStyle();
			}, 50);
		});

		table.on('order.dt', function () {
			setTimeout(() => {
				onLoadCustomPaginationStyle();
			}, 50);
		});
	}

	onMount(() => {
		const table = new DataTable(`#${tableTarget}`, {
			lengthChange: false,
			searching: true,
			ordering: true,
			info: true,
			searchDelay: 200,
			language: {
				search: 'ค้นหา:',
				zeroRecords: 'ไม่พบข้อมูลที่ค้นหา',
				info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ รายการ',
				infoEmpty: 'ไม่พบข้อมูล',
				infoFiltered: '(กรองจากทั้งหมด _MAX_ รายการ)'
			},
			autoWidth: false
		});
		tableTriggerEvent(table);

		const dtLength = document.querySelector('.dt-length');
		if (dtLength) {
			// @ts-ignore
			dtLength.style.display = 'none';
		}

		// modify the search bar
		const dtSearchDiv = document.querySelector('.dt-search');
		if (dtSearchDiv) {
			dtSearchDiv.classList.add('d-flex', 'align-items-center', 'gap-3', 'my-3');

			const inputElement = dtSearchDiv.querySelector('.dt-input');
			if (inputElement) {
				inputElement.classList.add('form-control');
				inputElement.setAttribute('placeholder', 'search');
			}
			const labelElement = document.querySelector('label[for="dt-search-0"]');
			if (labelElement) {
				labelElement.classList.add('d-none');
			}

			const searchButton = document.createElement('button');
			searchButton.textContent = 'ค้นหา';
			searchButton.className = 'btn btn-primary px-4 py-2';
			dtSearchDiv.appendChild(searchButton);

			const clearButton = document.createElement('button');
			clearButton.textContent = 'ล้างการค้นหา';
			clearButton.className = 'btn px-4 py-2 btn-outline-primary';
			clearButton.addEventListener('click', clear);
			dtSearchDiv.appendChild(clearButton);
		}

		const dtPagingLayout = document.querySelectorAll('.dt-layout-row');

		if (dtPagingLayout) {
			dtPagingLayout[2].className = 'd-flex m-2 gap-4 justify-content-end align-items-center';
		}
		// modify the pagination
		onLoadCustomPaginationStyle();
	});
</script>

<div class="table-responsive">
	<table id={tableTarget} style="width: 100%" class="table text-center table-striped">
		<thead class="table-c-primary">
			<tr>
				{#each colLabels as c}
					<th style="font-size: 0.90rem;" class="text-light px-4 bg-primary" scope="col">{c}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rowRecords as record, index}
				<tr>
					<td>{index}</td>
					{#each record.slice(0, -1) as cell}
						<td style="font-size: 0.90rem;">{cell}</td>
					{/each}
					<!--- สำหรับใช้กับ "สถานะ" ไม่ใช้ส่วนนี้ลบทึ้ง -->
					<td>
						<span class={badgeStatus(record.slice(-1))}>{record.slice(-1)}</span>
					</td>
					<td class="table-actions">
						<slot name="actions">
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
						</slot>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-c-primary {
		background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
	}

	.table-striped > tbody > tr:nth-child(2n + 1) > td,
	.table-striped > tbody > tr:nth-child(2n + 1) > th {
		background-color: rgba(#f8f9fa, 0.5);
	}

	div.dt-length {
		display: none !important;
	}

	label.dt-length-0 {
	}

	@media (max-width: 1024px) {
		.on-xl-overflow-x-hidden {
			overflow-x: scroll;
		}
	}
</style>
