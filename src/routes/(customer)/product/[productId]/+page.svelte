<script context="module">
	export async function load({ params }) {
		const { id } = params;

		try {
			console.log(`Fetching product with ID ${id} from API...`);
			// Fetch product by ID
			const res = await fetch(
				`http://127.0.0.1:8080/api/v1/product/get-product-id/:product_id${id}`
			);
			if (!res.ok) {
				throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
			}
			const product = await res.json();

			// Ensure product is an object
			if (typeof product !== 'object' || Array.isArray(product)) {
				throw new Error('Unexpected response format: product should be an object');
			}

			// Extract relevant data from the response
			const formattedProduct = {
				id: product.id, // Assuming there's an id field in product
				name: product.name,
				price: product.price,
				stock: product.stock,
				detail: product.detail,
				status: product.status,
				categoryId: product.categoryId,
				storeId: product.storeId,
				productAvatar: product.productAvatar
			};

			return { props: { product: formattedProduct } };
		} catch (error) {
			console.error('Error fetching product:', error);
			return { props: { error: error.message, product: null } };
		}
	}
</script>

<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';

	export let product;
	export let error;
</script>

<div>
	<NavbarCustomer />
	{#if product}
		<!-- Display product details -->
		<div class="container">
			<div style="padding-left: 60px; padding-right: 60px; padding-top: 30px;">
				<div class="card">
					<div class="row">
						<!-- image -->
						<div class="col-md-4">
							<!-- First image -->
							{product.productAvatar}
							<!-- Group of three images -->
							<div class="row" style="padding-top: 10px;">
								<div class="col-4">
									{product.productAvatar}
								</div>
								<div class="col-4">
									{product.productAvatar}
								</div>
								<div class="col-4">
									{product.productAvatar}
								</div>
							</div>
						</div>
	
						<div class="col-md-8">
							<h3 class="text-left mb-3">{product.name}</h3>
							<div class="d-flex align-items-center justify-content-between">
								<div>
									<div class="d-flex">
										<h5 style="margin-right: 34px;">หมวดหมู่</h5>
										<div>{product.categoryId}</div>
									</div>
									<div class="d-flex">
										<h5 style="margin-right: 50px;">ร้านค้า</h5>
										<div>{product.storeId}</div>
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
										<h2 style="font-weight: 700;">{product.price}</h2>
									</div>
	
									<div class="col-auto">
										<a href="#" class="btn btn-primary">ใส่ตะกร้า</a>
									</div>
								</div>
							</div>
							<br />
							<div>{product.detail}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else if error}
		<!-- Display error message -->
		<div class="container">
			<p>Error: {error}</p>
		</div>
	{:else}
		<!-- Display loading indicator -->
		<div class="container">
			<p>Loading...</p>
		</div>
	{/if}
	<div style="padding-left: 60px; padding-right: 60px; padding-top: 30px;">
		<div class="card">
			<div class="row">	
				<div class="col-md-4">	
					<img src="/src/lib/image/cyberpunk.jpg" class="card-img" alt="..." />
					<div class="row" style="padding-top: 10px;">
						<div class="col-4">
							<img src="/src/lib/image/cyberpunk.jpg" class="card-img mb-3" alt="..." />
						</div>
						<div class="col-4">
							<img src="/src/lib/image/cyberpunk.jpg" class="card-img mb-3" alt="..." />
						</div>
						<div class="col-4">
							<img src="/src/lib/image/cyberpunk.jpg" class="card-img mb-3" alt="..." />
						</div>
					</div>
				</div>

				<div class="col-md-8">
					<h3 class="text-left mb-3">Product Name</h3>
					<div class="d-flex align-items-center justify-content-between">
						<div>
							<div class="d-flex">
								<h5 style="margin-right: 34px;">หมวดหมู่</h5>
								<div>111</div>
							</div>
							<div class="d-flex">
								<h5 style="margin-right: 50px;">ร้านค้า</h5>
								<div>111</div>
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
								<h2 style="font-weight: 700;">551</h2>
							</div>

							<div class="col-auto">
								<a href="#" class="btn btn-primary">ใส่ตะกร้า</a>
							</div>
						</div>
					</div>
					<br />
					<div>detail</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		padding: 10px;
	}
</style>
