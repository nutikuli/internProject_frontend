<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';
	export let data; // Ensure product is defined as a prop

	console.log(data.product); // Check if product is defined and contains data

	const productName = data.product.result.product_data.name;
	const productDetail = data.product.result.product_data.detail;
	const productPrice = data.product.result.product_data.price;
	const productAvatar = data.product.result.product_data.product_avatar;
	const productStock = data.product.result.product_data.stock;
	const productCategoryId = data.product.result.product_data.categoryId;
	const productStoreId = data.product.result.product_data.storeId;
	const filesData = data.product.result.files_data;
	console.log(filesData);

	let activeIndex = 0;

	function showThumbnail(index) {
		activeIndex = index;
	}
</script>

<div>
	<NavbarCustomer />
	<div class="container">
		<div style="padding-left: 60px; padding-right: 60px; padding-top: 30px;">
			<div class="card">
				<div class="row">
					<!-- test image -->
					<div id="carouselAutoplaying" class="carousel slide">
						<div class="carousel-inner">
							{#each filesData as file, index}
								<div class="carousel-item {index === activeIndex ? 'active' : ''}">
									<img
									style="margin: 10px;"
										src={file.file_data ||
											'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m240/product-gallery/m240-mouse-top-view-graphite.png?v=1'}
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
										src={file.file_data ||
											'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m240/product-gallery/m240-mouse-top-view-graphite.png?v=1'}
										alt={file.file_name}
									/>
								</button>
							{/each}
						</div>
					</div>
					<!-- test image -->
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
									<a href="/customer/customer-cart/id" class="btn btn-primary">ใส่ตะกร้า</a>
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
		margin-top: 10px;
	}

	.carousel-item.active {
		display: block;
	}

	.thumbnail.active img {
		border: 1px solid #007bff;
	}
	.carousel,
	.carousel-inner,
	.carousel-item {
		width: min-content;
	}
	img {
		width: 200px;
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
	.carousel-thumbnails {
		margin-left: 25px;
	}
</style>
