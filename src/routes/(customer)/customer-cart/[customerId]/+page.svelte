<script>
	let name = 'ตัวอย่าง ชื่อนามสกุล';
	let phonenumber = '099-99999999';
	let address =
		'อัลตราภควัทคีตาเคลมซูโม่ ป๋อหลอเจ๊ปอดแหก แหม็บชีสฮันนีมูนซ้อ แล็บโต๊ะจีนเพรสแรลลีเบอร์เกอร์ ไฮบริดสตรอเบอรี ';
	let productPrice = 387;
	let shippingCost = 37;
	let totalPrice = productPrice + shippingCost;

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

	let showImage = "Image"
</script>

<div class="w-100 overflow-scroll">
	<div class="w-100 min-vh-100 d-flex align-items-top justify-content-center">
		<div class="row w-100">
			<div class="col-10 col-md-10 col-lg-10 col-xl-10 col-xxl-12 mx-auto">
				<h1>ตะกร้าสินค้า</h1>
				<table class="font-size">
					<thead>
						<tr>
							<th>#</th>
							<th>รูปภาพ</th>
							<th>รหัสสินค้า</th>
							<th>ชื่อสินค้า</th>
							<th>หมวดหมู่</th>
							<th>ราคาต่อหน่วย</th>
							<th>จำนวน</th>
							<th>ราคารวม</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
							<td>1111111111111111111</td>
						</tr>
					</tbody>
				</table>
				<div style="padding-top: 20px; padding-bottom: 30px; border-bottom: 1px solid #D9D9D9;">
					<div class="d-flex">
						<!-- left -->
						<div class="col-6" style="padding-right: 30px; border-right: 1px solid #D9D9D9;">
							<h4 class="font-weigh">ผู้ซื้อ</h4>
							<div class="d-flex">
								<div class="font-size" style="width: 120px;">
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
							<div class="d-flex">
								<div style="margin-right: 480px;">
									<div>ค่าสินค้า :</div>
									<div>ค่าจัดส่ง :</div>
									<div>ยอดรวม :</div>
								</div>
								<div style="text-align: right;">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="3"
												d="M8 6h5a3 3 0 0 1 3 3v.143A2.857 2.857 0 0 1 13.143 12H8m0 0h5a3 3 0 0 1 3 3v.143A2.857 2.857 0 0 1 13.143 18H8M8 6v12m3-14v2m0 12v2"
											/>
										</svg>
										{productPrice}
									</div>
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="3"
												d="M8 6h5a3 3 0 0 1 3 3v.143A2.857 2.857 0 0 1 13.143 12H8m0 0h5a3 3 0 0 1 3 3v.143A2.857 2.857 0 0 1 13.143 18H8M8 6v12m3-14v2m0 12v2"
											/>
										</svg>
										{shippingCost}
									</div>
									<div>
										<div class="right" style="font-size: large; margin-left: auto;">
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
							<div >
								<div class="d-flex">
									<div style="margin-right: 20px; ">ภาพหลักฐาน</div>
									<input id="image" type="image" bind:value={image}/><div class="slip-img">upload</div>
									<div class="slip-img">{showImage}</div>
								</div>
								<div class="d-flex">
									<div style="margin-right: 35px;">จำนวนเงิน</div>
									<input id="amount" type="text" bind:value={amount} placeholder="number" style="margin-bottom: 10px; width:300px; border: 1px solid #D9D9D9;"/>
									
								</div>
								<div class="d-flex">
									<div style="margin-right: 20px;">วันเวลาที่โอน</div>
									<input id="date" type="date" class="form-control" bind:value={date} style="margin-bottom: 10px; width:300px"/>
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
	.slip-img {
		width: 200px;
		height: 200px;
		border: 1px solid #D9D9D9;
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
