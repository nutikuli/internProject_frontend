<script context="module">
	import { baseDomainEndpoint, configGetter } from '$lib/internal/adapters/handler';
	import Model from '../../../../../../components/Model.svelte';
	import Get from '$lib/image/icon/get-icon.png';
	import Prepared from '$lib/image/icon/prepared-icon.png';
	import Send from '$lib/image/icon/sending-icon.png';
	import Success from '$lib/image/icon/success-icon.png';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import { enhance } from '$app/forms';

	export const iconState = [
		{
			label: 'รับออร์เดอร์แล้ว',
			iconSrc: Get
		},
		{
			label: 'เตรียมสินค้า',
			iconSrc: Prepared
		},
		{
			label: 'ส่งสินค้า',
			iconSrc: Send
		},
		{
			label: 'รับสินค้า',
			iconSrc: Success
		}
	];
</script>

<script>
	// /**
	//  * @typedef {Object} Props
	//  * @property {number} index - The index.
	//  * @property {string} store_id - The ID of the store.
	//  * @property {string} order_id - The ID of the product.
	//  * @property {string[]} record - The record[0].
	//  */

	/**
	 * @typedef {Object} DtoOrderResponse
	 * @property {string} status - The status of the response
	 * @property {number} status_code - The status code of the response
	 * @property {string} message - The message of the response
	 * @property {OrderResult} result
	 */

	/** @param {Date} date */
	function formatDate(date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear() + 543;
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${day}/${month}/${year} - ${hours}:${minutes}`;
	}

	// export let props;
	export let index;
	export let order_id;
	export let store_id;

	const state = {
		PENDING: 0,
		PREPARED: 1,
		SEND: 2,
		SUCCEED: 3,
		REJECTED: -1
	};

	const stateReverse = {
		0: 'PENDING',
		1: 'PREPARED',
		2: 'SEND',
		3: 'SUCCEED',
		'-1': 'REJECTED'
	};

	const btnState = {
		PENDING: 'ยืนยันการรับออเดอร์',
		PREPARED: 'เตรียมสินค้าเสร็จพร้อมส่ง',
		SEND: 'ส่งสินค้า'
	};

	/** @type {OrderResult} */
	$: props = null;

	let deliveryCost = 0;
	let amountTotal = 0;

	let loading = true;

	let buttonElement;
	let onSlipChecked = false;

	let transportDataForm = {
		delivery_type: '',
		parcel_number: '',
		sent_date: null
	};

	// async function updateOrderState(
	// 	state,
	// 	transport_data = {
	// 		delivery_type: '',
	// 		parcel_number: '',
	// 		sent_date: ''
	// 	}
	// ) {
	// 	if (data.status_code != 201 && data.status_code != 200) {
	// 		console.error(data);
	// 		Swal.fire({
	// 			icon: 'error',
	// 			title: 'เกิดข้อผิดพลาด',
	// 			text: 'ไม่สามารถอัปเดตสถานะได้, กรุณาลองใหม่'
	// 		});
	// 	} else {
	// 		Swal.fire({
	// 			icon: 'success',
	// 			title: 'สำเร็จ',
	// 			text: 'อัปเดตสถานะสำเร็จ'
	// 		}).then(() => {
	// 			location.reload();
	// 		});
	// 	}
	// }

	onMount(async () => {
		const res = await fetch(
			`${baseDomainEndpoint}/api/v1/order/get-store-order-by-id/${store_id}/${order_id}`
		);

		/** @type {DtoOrderResponse} */
		const storeOrders = await res.json();
		if (storeOrders.status_code != 201 && storeOrders.status_code != 200) {
			console.error(storeOrders);
			Swal.fire({
				icon: 'error',
				title: 'เกิดข้อผิดพลาด',
				text: 'ไม่สามารถดึงรายการออเดอร์ได้, กรุณาลองใหม่'
			}).then(() => {
				var modal = document.getElementById(`modal-editor-${index}`);
				modal.classList.remove('show');
				modal.style.display = 'none';
				modal.removeAttribute('aria-modal');
				modal.removeAttribute('role');
			});
		}

		props = storeOrders.result;

		console.log(props);

		deliveryCost = Math.floor(Math.random() * 50) + 1;
		amountTotal = props.product_data.reduce(
			(total, item) => total + item.product_data.price * item.order_product_data.quantity,
			0
		);

		loading = false;
	});
</script>

{#if loading}
	<div class="tw-flex tw-justify-center tw-text-black tw-items-center tw-h-96 tw-w-full">
		<div style="width: 3rem; height: 3rem;" class="spinner-border text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{:else}
	<div class="tw-bg-white tw-space-y-4 tw-p-6 tw-rounded-lg tw-w-full tw-max-w-4xl tw-mx-auto">
		<div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
			<h1 class="tw-text-xl tw-font-bold">
				รายละเอียดการสั่งซื้อ : BILL000-{props.order_data.id}
			</h1>
		</div>

		<div class="tw-flex tw-items-center tw-space-x-4 tw-my-4">
			{#each iconState as iconState, index}
				<div
					class="tw-flex-1 pe tw-flex tw-flex-col gap-2 tw-items-center tw-justify-center tw-p-2 tw-rounded-lg"
				>
					<img
						class:tw-grayscale={index > state[props.order_data.state]}
						src={iconState.iconSrc}
						class="tw-w-24 tw-filter tw-h-24"
						alt="icon-state"
					/>
					<p class="tw-ml-2">{iconState.label}</p>
				</div>
				<svg
					class="last:tw-hidden"
					width="26"
					height="42"
					viewBox="0 0 26 42"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M24.5036 22.6009L6.16993 40.9345C5.28572 41.8187 3.85219 41.8187 2.96807 40.9345L0.829762 38.7961C-0.0529394 37.9134 -0.0546372 36.4828 0.825989 35.5981L15.3557 21L0.825989 6.40194C-0.0546372 5.51717 -0.0529394 4.08656 0.829762 3.20386L2.96807 1.06555C3.85229 0.181337 5.28581 0.181337 6.16993 1.06555L24.5035 19.3991C25.3877 20.2832 25.3877 21.7167 24.5036 22.6009Z"
						fill="#9EC5FE"
					/>
				</svg>
			{/each}
		</div>

		<div
			class="tw-grid tw-grid-flow-col tw-grid-cols-2 tw-border-b tw-border-gray-200 pb-4 tw-text-start tw-my-4"
		>
			<div class="tw-border-r-2 tw-border-gray-200 tw-pr-4">
				<h2 class="tw-font-bold tw-mb-2">ผู้ซื้อ</h2>
				<div class="row">
					<div class="col-4">
						<p>ชื่อ - นามสกุล:</p>
					</div>
					<div class="col-8">{props.customer_data.name}</div>
				</div>
				<div class="row">
					<div class="col-3">
						<p>เบอร์โทร:</p>
					</div>
					<div class="col-9">{props.customer_data.phone}</div>
				</div>
				<div class="row">
					<div class="col-3">
						<p>ชื่อที่อยู่ในการจัดส่ง:</p>
					</div>
					<div class="col-9">{props.customer_data.location}</div>
				</div>
			</div>
			<div class="tw-pl-4">
				{#if props.order_data.state !== 'SEND'}
					<div class="">
						<h2 class="tw-font-bold tw-mb-2">การจัดส่ง</h2>
						<p>ประเภทการจัดส่ง: {props.order_data.delivery_type}</p>
						<p>เลขพัสดุ: {props.order_data.parcel_number}</p>
						<p>วันเวลาจัดส่ง: {props.order_data.sent_date}</p>
					</div>
					<!-- content here -->
				{:else}
					<!-- else content here -->
					<div>
						<h2 class="tw-font-bold tw-mb-2">การจัดส่ง</h2>
						<div class="row">
							<div class="col-4">
								<p>ประเภทการจัดส่ง:</p>
							</div>
							<div class="col-8">
								<input
									bind:value={transportDataForm.delivery_type}
									type="text"
									required
									class="form-control"
									placeholder="placeholder"
									aria-label="placeholder"
									aria-describedby="basic-addon1"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-4">
								<p>เลขพัสดุ:</p>
							</div>
							<div class="col-8">
								<input
									required
									bind:value={transportDataForm.parcel_number}
									type="text"
									class="form-control"
									placeholder="placeholder"
									aria-label="placeholder"
									aria-describedby="basic-addon1"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-4">
								<p>วันเวลาจัดส่ง:</p>
							</div>
							<div class="col-8">
								<input
									required
									bind:value={transportDataForm.sent_date}
									type="date"
									class="form-control"
									placeholder="placeholder"
									aria-label="placeholder"
									aria-describedby="basic-addon1"
								/>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<h2 class="tw-font-bold tw-mb-4">รายละเอียดการสั่งซื้อ</h2>
		<div class="tw-divide-y tw-space-y-4 tw-divide-gray-200">
			{#each props.product_data as item}
				<a
					href="#"
					class="tw-grid tw-grid-cols-5 tw-items-center tw-border tw-border-gray-200 tw-rounded-lg tw-shadow hover:tw-bg-gray-100"
				>
					<img
						class="tw-col-span-1 tw-object-cover tw-rounded-t-lg tw-w-full tw-h-auto"
						src={item.files_data.length > 0
							? item.files_data[0].file_data
							: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'}
						alt=""
					/>
					<div class="tw-col-span-4 tw-rounded-lg tw-w-full tw-px-4 tw-leading-normal">
						<div class="tw-flex tw-text-start tw-justify-between">
							<div class="tw-flex tw-flex-col tw-justify-between">
								<h5 class="tw-text-xl tw-font-bold tw-tracking-tight">
									{item.product_data.name}
								</h5>
								<p class="tw-font-light">
									PROD000-{item.product_data.id}
								</p>
							</div>
							<div class="tw-flex tw-gap-6 tw-text-end tw-flex-col tw-justify-between">
								<p class="tw-font-light">
									x{item.order_product_data.quantity}
								</p>
								<h5 class="tw-text-2xl tw-font-bold">
									฿{item.product_data.price * item.order_product_data.quantity}
								</h5>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>

		<div class="row">
			<div class="col">
				{#if props.order_data.state === 'PENDING'}
					<div class="card tw-rounded-lg">
						<div class="card-body tw-flex tw-justify-center">
							<img
								src={props.files_data.length > 0
									? `http://${props.files_data[0].file_data}`
									: 'https://shop.prachataistore.net/wp-content/uploads/2023/05/IMG_2872-1.jpeg'}
								alt=""
							/>
						</div>
						<div class="card-footer tw-block">
							<button
								bind:this={buttonElement}
								on:click={() =>
									Swal.fire({
										title: 'สลิปการโอนเงิน',
										text: 'กรุณาตรวจสอบสลิปการโอนเงิน',
										imageUrl:
											props.files_data.length > 0
												? `http://${props.files_data[0].file_data}`
												: 'https://shop.prachataistore.net/wp-content/uploads/2023/05/IMG_2872-1.jpeg',
										imageWidth: 400,
										imageHeight: 400,
										imageAlt: 'Custom image',
										showDenyButton: true,
										confirmButtonText: 'สลิปถูกต้อง'
									}).then((res) => {
										if (res.isConfirmed) {
											buttonElement.classList.remove('btn-primary');
											buttonElement.classList.add('btn-success');

											buttonElement.textContent = 'สลิปถูกต้อง';

											onSlipChecked = true;
										}
									})}
								class="btn tw-w-full py-2 btn-sm btn-primary"
							>
								ตรวจสอบสลิป
							</button>
						</div>
					</div>
				{/if}
			</div>
			<div class="col">
				<div class="tw-flex tw-flex-col tw-mt-6">
					<div class="tw-flex tw-justify-between">
						<p>เวลาที่ชำระเงิน:</p>
						<p>{formatDate(new Date(props.order_data.created_at))}</p>
					</div>
					<div class="tw-flex tw-justify-between">
						<p>วันเวลาที่สั่งซื้อ:</p>
						<p>{formatDate(new Date(props.order_data.created_at))}</p>
					</div>
					<div class="tw-flex tw-justify-between">
						<p>ค่าสินค้า:</p>
						<p class="tw-font-bold">
							฿{props.product_data.reduce(
								(total, item) => total + item.product_data.price * item.order_product_data.quantity,
								0
							)}
						</p>
					</div>
					<div class="tw-flex tw-justify-between">
						<p>ค่าจัดส่ง:</p>
						<p class="tw-font-bold">฿{deliveryCost}</p>
					</div>
					<div class="tw-flex tw-justify-between">
						<p>ยอดรวม:</p>
						<p class="tw-font-bold tw-text-2xl">฿{amountTotal + deliveryCost}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style="display:block;" class="modal-footer">
		<div class="">
			{#if state[props.order_data.state] === 0}
				<div class="tw-float-left">
					<form
						action="?/updateOrderState"
						use:enhance={async ({ formData }) => {
							formData.append('order_id', order_id);
							formData.append('state', 'REJECTED');
							formData.append('transport_data', JSON.stringify(transportDataForm));

							return async ({ result, update }) => {
								if (result.type === 'success') {
									Swal.mixin({
										toast: true,
										position: 'top-end',
										showConfirmButton: false,
										timer: 3000,
										timerProgressBar: true,
										didOpen: (toast) => {
											toast.onmouseenter = Swal.stopTimer;
											toast.onmouseleave = Swal.resumeTimer;
										}
									}).fire({
										title: 'สำเร็จ',
										text: 'อัปเดตรายการสั่งซื้อสำเร็จ',
										icon: 'success'
									});
								}

								if (result.type === 'failure') {
									Swal.mixin({
										toast: true,
										position: 'top-end',
										showConfirmButton: false,
										timer: 3000,
										timerProgressBar: true,
										didOpen: (toast) => {
											toast.onmouseenter = Swal.stopTimer;
											toast.onmouseleave = Swal.resumeTimer;
										}
									}).fire({
										title: 'ทำรายการไม่สำเร็จ',
										text: 'อัปเดตรายการสั่งซื้อสำเร็จไม่สำเร็จ โปรดลองใหม่อีกครั้ง',
										icon: 'error'
									});
								}

								props = {
									...props,
									order_data: {
										...props.order_data,
										sent_date: transportDataForm.sent_date,
										delivery_type: transportDataForm.delivery_type,
										parcel_number: transportDataForm.parcel_number,
										state: 'REJECTED'
									}
								};
								await update();
							};
						}}
						method="POST"
					>
						<button data-bs-dismiss="modal" type="submit" class="btn btn-sm py-2 px-4 btn-danger"
							>ยกเลิก</button
						>
					</form>
				</div>
			{/if}
			<div class=" tw-float-right">
				<div class="tw-flex gap-2">
					<div class="">
						<form
							action="?/updateOrderState"
							use:enhance={async ({ formData }) => {
								formData.append('order_id', order_id);
								formData.append('state', stateReverse[state[props.order_data.state] + 1]);
								formData.append('transport_data', JSON.stringify(transportDataForm));

								return async ({ result, update }) => {
									if (result.type === 'success') {
										Swal.mixin({
											toast: true,
											position: 'top-end',
											showConfirmButton: false,
											timer: 3000,
											timerProgressBar: true,
											didOpen: (toast) => {
												toast.onmouseenter = Swal.stopTimer;
												toast.onmouseleave = Swal.resumeTimer;
											}
										}).fire({
											title: 'สำเร็จ',
											text: 'อัปเดตรายการสั่งซื้อสำเร็จ',
											icon: 'success'
										});
									}

									if (result.type === 'failure') {
										Swal.mixin({
											toast: true,
											position: 'top-end',
											showConfirmButton: false,
											timer: 3000,
											timerProgressBar: true,
											didOpen: (toast) => {
												toast.onmouseenter = Swal.stopTimer;
												toast.onmouseleave = Swal.resumeTimer;
											}
										}).fire({
											title: 'ทำรายการไม่สำเร็จ',
											text: 'อัปเดตรายการสั่งซื้อสำเร็จไม่สำเร็จ โปรดลองใหม่อีกครั้ง',
											icon: 'error'
										});
									}

									props = {
										...props,
										order_data: {
											...props.order_data,
											sent_date: transportDataForm.sent_date,
											delivery_type: transportDataForm.delivery_type,
											parcel_number: transportDataForm.parcel_number,
											state: stateReverse[state[props.order_data.state] + 1]
										}
									};
									await update();
								};
							}}
							method="POST"
						>
							{#if state[props.order_data.state] < 3 && props.order_data.state !== 'REJECTED'}
								<button
									type="submit"
									disabled={!onSlipChecked && props.order_data.state === 'PENDING'}
									class="btn btn-sm py-2 px-4 {onSlipChecked || props.order_data.state !== 'PENDING'
										? 'btn-primary'
										: 'btn-secondary'}">{btnState[props.order_data.state]}</button
								>
							{/if}
						</form>
					</div>
					<button
						type="button"
						class="btn btn-sm py-2 px-4 btn-outline-primary"
						data-bs-dismiss="modal"
						on:click={() => {
							location.reload();
						}}>ปิดหน้าต่าง</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
