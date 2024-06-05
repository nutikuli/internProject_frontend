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
	let imageData = [{ productProductImage }];
</script>

<div>
	<NavbarCustomer />
	<div class="container">
		<div style="padding-left: 60px; padding-right: 60px; padding-top: 30px;">
			<div class="card">
				<div class="row">
					<div class="main-img">
						<img src={productProductAvatar} alt={productName} />
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
									<Icon icon="tabler:currency-bath" width="35" height="35" />
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
	.main-img {
		width: min-content;
	}
	img {
		width: 350px;
		height: auto;
	}

	.btn {
		display: block;
		margin-top: 20px;
	}
</style>
