<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';
	export let data; // Ensure product is defined as a prop

	console.log(data.product); // Check if product is defined and contains data

	const productName = data.product.result.product_data.name;
	const productDetail = data.product.result.product_data.detail;
	const productPrice = data.product.result.product_data.price;
	const productProductAvatar = data.product.result.product_data.product_avatar;
	const productProductImage = data.product.result.files_data;
	const productStock = data.product.result.product_data.stock;
	const productCategoryId = data.product.result.product_data.categoryId;
	const productStoreId = data.product.result.product_data.storeId;
	let imageData = [{productProductImage}]
</script>

<div>
	<NavbarCustomer />
	<div class="container">
		<div style="padding-left: 60px; padding-right: 60px; padding-top: 30px;">
			<div class="card">
				<div class="row">
					<div>
						<div class="main-img">
							<img src={productProductAvatar} alt={productName}>
						</div>
					</div>

					<div class="col-md-8">
						<h3 class="text-left mb-3">{productName}</h3>
						<div class="d-flex align-items-center justify-content-between">
							<div>
								<div class="d-flex">
									<h5 style="margin-right: 34px;">หมวดหมู่</h5>
									<div>{productCategoryId}</div>
								</div>
								<div class="d-flex">
									<h5 style="margin-right: 50px;">ร้านค้า</h5>
									<div>{productStoreId}</div>
								</div>
								<div class="d-flex">
									<div style="margin-right: 60px; margin-top: 10px;">จำนวน</div>
									<input type="text" class="form-control w-100 mr-3" placeholder="Input" />
									<div style="margin-left: 10px; margin-top: 10px;">ชิ้น</div>
								</div>
							</div>
							<div>
								<div class="d-flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
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
									<h2 style="font-weight: 700;">{productPrice}</h2>
								</div>

								<div class="col-auto">
									<a href="#" class="btn btn-primary">ใส่ตะกร้า</a>
								</div>
							</div>
						</div>
						<br />
						<div>{productDetail}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.main-img{
		width: 20px;
	}
	.side-img{
		width: 50;
	}
	.product-detail {
		padding: 20px;
	}

	.product-detail img {
		max-width: 100%;
		height: auto;
	}

	.btn {
		display: block;
		margin-top: 20px;
	}
</style>
