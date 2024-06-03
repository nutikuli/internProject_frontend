<script>
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';
	// Import the load function from product.js
	import { load } from './+page.server.js';

	// Define a reactive variable to hold the fetched data or error
	let dataOrError = null;

	// Function to call load function with productId
	async function fetchData(productId) {
		// Call the load function and await its result
		const result = await load(productId);

		// Update the reactive variable with the result
		dataOrError = result;
	}

	// Call fetchData function with your desired productId
	// For example:
	fetchData(123);
</script>

<div>
	<NavbarCustomer />
	{#if dataOrError}
		{#if dataOrError.error}
			<p>Error: {dataOrError.error}</p>
		{:else}
			<div>
				<p>Name: {dataOrError.name}</p>
				<p>Price: {dataOrError.price}</p>
				<p>Stock: {dataOrError.stock}</p>
				<!-- Display other properties as needed -->
			</div>
		{/if}
	{/if}
	<div style="padding-left: 60px; padding-right: 60px; padding-top: 30px;">
		<div class="card">
			<div class="row">
				<!-- image -->
				<div class="col-md-4">
					<!-- First image -->
					<img src="/src/lib/image/cyberpunk.jpg" class="card-img" alt="..." />
					<!-- Group of three images -->
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
					<h3 class="text-left mb-3">{dataOrError.name}</h3>
					<div class="d-flex align-items-center justify-content-between">
						<div>
							<div class="d-flex">
								<h5 style="margin-right: 34px;">หมวดหมู่</h5>
								<div>{dataOrError.categoryId}</div>
							</div>
							<div class="d-flex">
								<h5 style="margin-right: 50px;">ร้านค้า</h5>
								<div>{dataOrError.storeId}</div>
							</div>
							<div class="d-flex">
								<div style="margin-right: 60px; margin-top: 10px;">จำนวน</div>
								<input type="text" class="form-control w-100 mr-3" placeholder="Input" />
								<div style="margin-left: 10px; margin-top: 10px;">ชิ้น</div>
							</div>
						</div>
						<div>
							<div class="d-flex">
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
									<path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="3"
										d="M8 6h5a3 3 0 0 1 3 3v.143A2.857 2.857 0 0 1 13.143 12H8m0 0h5a3 3 0 0 1 3 3v.143A2.857 2.857 0 0 1 13.143 18H8M8 6v12m3-14v2m0 12v2"
									/>
								</svg>
								<h2 style="font-weight: 700;">{dataOrError.price}</h2>
							</div>

							<div class="col-auto">
								<a href="#" class="btn btn-primary">ใส่ตะกร้า</a>
							</div>
						</div>
					</div>
					<br />
					<div>{dataOrError.detail}</div>
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
