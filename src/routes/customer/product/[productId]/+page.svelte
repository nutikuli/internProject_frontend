<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;

	console.log(data.product);

	let productId = data.product.result.product_data.id;
	let productName = data.product.result.product_data.name;
	let productDetail = data.product.result.product_data.detail;
	let productPrice = data.product.result.product_data.price;
	let productAvatar = data.product.result.product_data.product_avatar;
	let productStock = data.product.result.product_data.stock;
	let productCategoryId = data.product.result.product_data.category_id;
	let productStoreId = data.product.result.product_data.store_id;
	let filesData = data.product.result.files_data;
	let categoryName = data.product.result.product_category_data.name;

	let quantity = 1;
	let totalPrice = 0;

	function calculateTotalPrice() {
		return quantity * productPrice;
	}
	$: totalPrice = calculateTotalPrice();

	function refreshTotalPrice() {
		totalPrice = calculateTotalPrice();
	}

	console.log(filesData);

	let activeIndex = 0;

	function showThumbnail(index) {
		activeIndex = index;
	}

</script>

<div>
	<NavbarCustomer id={data.customer_account.id}/>
	<div class="container">
		<div style="padding-top: 30px;">
			<div class="card">
				<div class="row">
					<!-- test image -->
					<div
						id="carouselAutoplaying"
						class="col-5 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-4 carousel slide"
					>
						<div class="carousel-inner">
							{#each filesData as file, index}
								<div class="carousel-item {index === activeIndex ? 'active' : ''}">
									<img
										style="margin: 10px; width: 340px"
										src={`http://${file.file_data}` ||
											'http://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m240/product-gallery/m240-mouse-top-view-graphite.png?v=1'}
										alt={file.file_name}
									/>
								</div>
							{/each}
						</div>
						<div class="carousel-thumbnails d-flex">
							{#each filesData as file, index}
								<button
									type="button"
									class="thumbnail {index === activeIndex ? 'active' : ''}"
									data-bs-target="#carouselAutoplaying"
									data-bs-slide-to={index}
									style="border: 0cm;"
									on:click={() => showThumbnail(index)}
								>
									<img
										class="img-thumbnail"
										src={`http://${file.file_data}` ||
											'http://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m240/product-gallery/m240-mouse-top-view-graphite.png?v=1'}
										alt={file.file_name}
									/>
								</button>
							{/each}
						</div>
					</div>

					<div class="detail col-xxl-8">
						<h3 class="text-left mb-3">{productName}</h3>
						<div class="d-flex align-items-center justify-content-between">
							<div>
								<div class="d-flex">
									<h5 style="margin-right: 34px;">หมวดหมู่</h5>
									<div>
										<div>{categoryName}</div>
									</div>
								</div>
								<div class="d-flex">
									<h5 style="margin-right: 50px;">ร้านค้า</h5>
									<div>
										<div>{productStoreId}</div>
									</div>
								</div>
								<div class="d-flex">
									<div style="margin-right: 46px; margin-top: 10px;">จำนวน</div>
									<input
										type="number"
										class="form-control w-100 mr-3"
										placeholder="Input"
										bind:value={quantity}
										min="1"
										on:click={refreshTotalPrice}
									/>
									<div style="margin-left: 10px; margin-top: 10px;">ชิ้น</div>
								</div>
							</div>
							<div style="margin-right: 20px">
								<div class="d-flex">
									<Icon icon="tabler:currency-bath" color="#0D6EFD" width="35" height="35" />
									<h2 style="font-weight: 700; font-size: 30px; color:#0D6EFD;">{totalPrice}</h2>
								</div>
								<div class="col-auto">
									<button class="btn btn-primary">ใส่ตะกร้า</button>
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
	.detail {
		margin: 10px;
	}
	.thumbnail {
		cursor: pointer;
		margin-right: 10px;
	}

	.img-thumbnail {
		max-width: 100px;
		max-height: 100px;
	}

	.carousel-item {
		transition: transform 0.5s ease;
	}

	.carousel-thumbnails {
		margin-top: 5px;
	}

	.carousel-item.active {
		display: block;
		width: 320px;
	}

	.thumbnail.active img {
		border: 1px solid #007bff;
	}
	.carousel,
	.carousel-item {
		width: min-content;
	}
	img {
		width: 150px;
		height: auto;
	}

	.btn {
		display: block;
		margin-top: 20px;
	}
	/* ---------------- */
	.img-thumbnail {
		width: 100px;
	}
</style>
