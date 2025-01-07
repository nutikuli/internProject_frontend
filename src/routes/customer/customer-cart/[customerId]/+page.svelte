<script>
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';

	// customer Detail
	let name = 'ตัวอย่าง ชื่อนามสกุล';
	let phonenumber = '099-99999999';
	let address =
		'อัลตราภควัทคีตาเคลมซูโม่ ป๋อหลอเจ๊ปอดแหก แหม็บชีสฮันนีมูนซ้อ แล็บโต๊ะจีนเพรสแรลลีเบอร์เกอร์ ไฮบริดสตรอเบอรี ';
	let productPrice = '387';
	let shippingCost = '37';
	let totalPrice = '414';

	let bankname = 'ธนาคารกรุงเทพ';
	let accountName = 'ชื่อบัญชี นายทดสอบ นามสกุลสมมติ';
	let accountNumber = '012-345-67890';

	let selectedValue = 0;
	let image = '';
	let amount = '';
	let date = '';
	function handleChange(event) {
		selectedValue = event.target.value;
	}
	function handleSubmit() {
		// Handle form submission logic here
		console.log('Selected Date:', date);
	}

	let formRef;
	function triggerSubmit() {
		formRef.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
	}

	let showImage = 'Image';

	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	export let colLabels = [
		'#',
		'รูปภาพ',
		'รหัสสินค้า',
		'ชื่อสินค้า',
		'หมวดหมู่',
		'ราคาต่อหน่วย',
		'จำนวน',
		'ราคารวม'
	];

	// สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
	/** @type {string[][]} */
	export let rowRecords = [
		['Image', 'BILL0001', 'ที่นอนยางพาราแท้100%', 'ที่นอน', '100.00', '1', '100.00']
	];
	// ----------------------------------------------------------
	// /** @type {import('./$types').PageData} */
	// export let data;

	// /** @type {import('./$types').ActionData} */
	// export let form;

	// let rowRecordMapper = writable(
	// 	data.products.map((item, index) => {
	// 		if (item.product_data) {
	// 			const d = item.product_data;

	// 			return [
	// 				index + 1,
	// 				item.files_data.length > 0
	// 					? `http://${item.files_data[0].file_data}`
	// 					: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
	// 				`BILL000-${d.id}`,
	// 				item.product_data.name,
	// 				item.product_category_data.name,
	// 				item.product_data.price,
	// 				item.order_product_data.quantity
					
	// 			];
	// 		}
	// 	})
	// );

	// $: tableData = null;
</script>





<div class="w-100 overflow-scroll">
	<div class="w-100 min-vh-100 d-flex align-items-top justify-content-center">
		<div class="row w-100">
			<div class="col-10 col-md-10 col-lg-10 col-xl-10 col-xxl-12 mx-auto">
				<h1>ตะกร้าสินค้า</h1>
				<table class="table text-center table-striped">
					<thead class="table-c-primary">
						<tr>
							{#each colLabels as c, i}
								{#if i === 0}
									<th class="text-light px-4 bg-primary text-center" scope="col">{c}</th>
								{:else if i === 1}
									<th class="text-light px-4 bg-primary text-center" scope="col">{c}</th>
								{:else if i === 2}
									<th class="text-light px-4 bg-primary text-left" scope="col">{c}</th>
								{:else if i === 3}
									<th class="text-light px-4 bg-primary text-left" scope="col">{c}</th>
								{:else if i === 4}
									<th class="text-light px-4 bg-primary text-left" scope="col">{c}</th>
								{:else}
									<th class="text-light px-4 bg-primary text-right" scope="col">{c}</th>
								{/if}
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each rowRecords as record, index}
							<tr>
								<td>{index}</td>
								{#each record as cell, cellIndex}
									{#if cellIndex === 0}
										<td class="text-center">{cell}</td>
									{:else if cellIndex === 1}
										<td class="text-left">{cell}</td>
									{:else if cellIndex === 2}
										<td class="text-left">{cell}</td>
									{:else if cellIndex === 3}
										<td class="text-left">{cell}</td>
									{:else if cellIndex === 4}
										<td class="text-right">{cell}</td>
									{:else if cellIndex === 5}
										<td class="text-right">{cell}</td>
									{:else if cellIndex === 6}
										<td class="text-right">{cell}</td>
									{/if}
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				<div style="padding-top: 20px; padding-bottom: 30px; border-bottom: 1px solid #D9D9D9;">
					<div class="d-flex">
						<!-- left -->
						<div class="col-6" style="padding-right: 30px; border-right: 1px solid #D9D9D9;">
							<h4 class="font-weigh">ผู้ซื้อ</h4>
							<div class="d-flex">
								<div class="font-size" style="width: 180px;">
									<div class="font-weigh">ชื่อ - นามสกุล :</div>
									<div class="font-weigh">เบอร์โทร :</div>
									<div class="font-weigh">ที่อยู่ในการจัดส่ง :</div>
								</div>
								<div class="font-size" style="margin-left: 30px;">
									<div>{name}</div>
									<div>{phonenumber}</div>
									<div>{address}</div>
								</div>
							</div>
						</div>
						<!-- right -->
						<div class="font-weigh font-size col-6" style="padding-left: 30px;">
							<div class="d-flex justify-content-between">
								<div class="col-3">
									<div>ค่าสินค้า :</div>
									<div>ค่าจัดส่ง :</div>
									<div>ยอดรวม :</div>
								</div>
								<div class="text-right">
									<div class="d-flex">
										<Icon icon="tabler:currency-bath" width="20" height="20" />
										{productPrice}
									</div>
									<div class="d-flex">
										<Icon icon="tabler:currency-bath" width="20" height="20" />
										{shippingCost}
									</div>
									<div class="text-right">
										<div style="font-size: large;">
											{totalPrice}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="d-flex"
					style="padding-top: 30px; padding-bottom: 30px; border-bottom: 1px solid #D9D9D9;"
				>
					<div class="col-6" style="padding-right: 30px; border-right: 1px solid #D9D9D9; ">
						<h4 class="font-weigh">วิธีการชำระเงิน</h4>
						<div class="d-flex">
							<div class="font-size" style="padding-right: 10px; margin-top: 10px">เลือกธนาคาร</div>
							<select on:change={handleChange} id="input" style="width: 200px;">
								<option selected>--select--</option>
								<option value="1">ธนาคารกรุงเทพ</option>
							</select>
						</div>
						<div style="padding-top: 30px;">
							{#if selectedValue != 0}
								<div class="card">
									<div class="d-flex font-weigh">
										<div class="card-img">bank image</div>
										<div>
											<div style="font-size: 26px;">{bankname}</div>
											<div style="font-size: 24px;">{accountName}</div>
											<div style="font-size: 35px;">{accountNumber}</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
					<div class="col-6" style="padding-left: 30px;">
						<h4>หลักฐานการชำระเงิน</h4>
						<form bind:this={formRef} on:submit={handleSubmit}>
							<div>
								<div class="d-flex">
									<div style="margin-right: 20px; ">ภาพหลักฐาน</div>
									<input id="image" type="image" bind:value={image} />
									<div class="slip-img">upload</div>
									<div class="slip-img">{showImage}</div>
								</div>
								<div class="d-flex">
									<div style="margin-right: 35px;">จำนวนเงิน</div>
									<input
										id="amount"
										type="text"
										bind:value={amount}
										placeholder="number"
										style="margin-bottom: 10px; width:300px; border: 1px solid #D9D9D9;"
									/>
								</div>
								<div class="d-flex">
									<div style="margin-right: 20px;">วันเวลาที่โอน</div>
									<input
										id="date"
										type="date"
										class="form-control"
										bind:value={date}
										style="margin-bottom: 10px; width:300px"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
				<button on:click={triggerSubmit} class="btn btn-primary" style="margin: 20px;" type="submit"
					>ยืนยันการสั่งซื้อสินค้า</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.text-left {
		text-align: left;
	}

	.text-right {
		text-align: right;
	}

	.text-center {
		text-align: center;
	}
	.slip-img {
		width: 200px;
		height: 200px;
		border: 1px solid #d9d9d9;
		text-align: center;
		align-content: center;
		margin-bottom: 10px;
		margin-right: 10px;
	}
	.card-img {
		width: 120px;
		height: 120px;
		border-radius: 16px;
		text-align: center;
		align-content: center;
	}
	.font-weigh {
		font-weight: 700;
	}
	.font-size {
		font-size: 16px;
	}

	table {
		width: 100%;
	}

	th,
	td {
		padding: 8px;
	}

	th {
		color: white;
		background-color: #0d6efd;
		text-align: left;
	}
</style>
