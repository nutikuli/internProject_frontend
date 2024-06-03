<script context="module">
	export async function load() {
		try {
			console.log('Fetching products from API...');
			// Fetch all products
			const res = await fetch('http://127.0.0.1:8080/api/v1/product/get-products');
			if (!res.ok) {
				throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
			}
			const products = await res.json();

			// Ensure products is an array
			if (!Array.isArray(products)) {
				throw new Error('Unexpected response format: products should be an array');
			}

			// Extract relevant data from the response
			const formattedProducts = products.map((product) => ({
				id: product.id, // Assuming there's an id field in product
				name: product.name,
				price: product.price,
				stock: product.stock,
				detail: product.detail,
				status: product.status,
				categoryId: product.categoryId,
				storeId: product.storeId,
				productAvatar: product.productAvatar
			}));

			return { props: { products: formattedProducts } };
		} catch (error) {
			console.error('Error fetching products:', error);
			return { props: { error: error.message, products: [] } };
		}
	}
</script>

<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../components/navbarCustomer.svelte';

	export let products = [];
	export let error;

	function gotoDetail(id) {
		window.location.href = `/product/${id}`;
	}
</script>

<div>
	<NavbarCustomer />
	<div class="showProduct">
		<!-- sort -->
		<div class="sort-container">
			<span class="sort-label">จัดเรียงตาม</span>
			<select class="form-select" id="input">
				<option selected>--select--</option>
				<option value="1">ราคา มากไปน้อย</option>
				<option value="2">ราคา น้อยไปมาก</option>
				<option value="3">สินค้าล่าสุด</option>
				<option value="4">สินค้าเก่าสุด</option>
			</select>
		</div>

		<!-- productList -->
		{#if error}
			<p>Error: {error}</p>
		{:else}
			<div class="product-container">
				{#each products as product}
					<div class="product-list">
						<button
							type="button"
							class="product-image"
							on:click={() => gotoDetail(product.id)}
							aria-label={`View details of ${product.name}`}
						>
							<img src={product.productAvatar} alt={product.name} />
						</button>
						<div class="card-body">
							<h5 class="card-title">{product.name}</h5>
							<p class="card-text">{product.detail}</p>
							<div class="row justify-content-between align-items-end">
								<div class="col-auto d-flex align-items-center">
									<Icon icon="tabler:currency-bath" width="25" height="25" />
									<h2 class="product-price">{product.price}</h2>
								</div>
							</div>
							<div class="col-auto buy-button">
								<a href="customer-cart/id" class="btn btn-primary">ซื้อเลย</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
<!-- <div class="product-container">
	<div class="product-list">
		<button type="button" class="product-image" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
		</button>
		<div class="card-body">
			<h5 class="card-title">aaa</h5>
			<p class="card-text">aaa</p>
			<div class="row justify-content-between align-items-end">
				<div class="col-auto d-flex align-items-center">
					<Icon icon="tabler:currency-bath" width="25" height="25" />
					<h2 class="product-price">aaa</h2>
				</div>
				<div class="col-auto buy-button">
					<a href="#" class="btn btn-primary">ซื้อเลย</a>
				</div>
			</div>
		</div>
	</div>
	<div class="product-list">
		<button type="button" class="product-image" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
		</button>
		<div class="card-body">
			<h5 class="card-title">aaa</h5>
			<p class="card-text">aaa</p>
			<div class="row justify-content-between align-items-end">
				<div class="col-auto d-flex align-items-center">
					<Icon icon="tabler:currency-bath" width="25" height="25" />
					<h2 class="product-price">aaa</h2>
				</div>
				<div class="col-auto buy-button">
					<a href="#" class="btn btn-primary">ซื้อเลย</a>
				</div>
			</div>
		</div>
	</div>
	<div class="product-list">
		<button type="button" class="product-image" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
		</button>
		<div class="card-body">
			<h5 class="card-title">aaa</h5>
			<p class="card-text">aaa</p>
			<div class="row justify-content-between align-items-end">
				<div class="col-auto d-flex align-items-center">
					<Icon icon="tabler:currency-bath" width="25" height="25" />
					<h2 class="product-price">aaa</h2>
				</div>
				<div class="col-auto buy-button">
					<a href="#" class="btn btn-primary">ซื้อเลย</a>
				</div>
			</div>
		</div>
	</div>
	<div class="product-list">
		<button type="button" class="product-image" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
		</button>
		<div class="card-body">
			<h5 class="card-title">aaa</h5>
			<p class="card-text">aaa</p>
			<div class="row justify-content-between align-items-end">
				<div class="col-auto d-flex align-items-center">
					<Icon icon="tabler:currency-bath" width="25" height="25" />
					<h2 class="product-price">aaa</h2>
				</div>
				<div class="col-auto buy-button">
					<a href="#" class="btn btn-primary">ซื้อเลย</a>
				</div>
			</div>
		</div>
	</div>
	<div class="product-list">
		<button type="button" class="product-image" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
		</button>
		<div class="card-body">
			<h5 class="card-title">aaa</h5>
			<p class="card-text">aaa</p>
			<div class="row justify-content-between align-items-end">
				<div class="col-auto d-flex align-items-center">
					<Icon icon="tabler:currency-bath" width="25" height="25" />
					<h2 class="product-price">aaa</h2>
				</div>
				<div class="col-auto buy-button">
					<a href="#" class="btn btn-primary">ซื้อเลย</a>
				</div>
			</div>
		</div>
	</div>
	<div class="product-list">
		<button type="button" class="product-image" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
		</button>
		<div class="card-body">
			<h5 class="card-title">aaa</h5>
			<p class="card-text">aaa</p>
			<div class="row justify-content-between align-items-end">
				<div class="col-auto d-flex align-items-center">
					<Icon icon="tabler:currency-bath" width="25" height="25" />
					<h2 class="product-price">aaa</h2>
				</div>
				<div class="col-auto buy-button">
					<a href="#" class="btn btn-primary">ซื้อเลย</a>
				</div>
			</div>
		</div>
	</div>
</div> -->


<style>
	.product-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 10px;
	}

	.product-list {
		display: flex;
		flex-direction: column;
		margin: 10px;
		height: 100%;
	}

	.product-image {
		cursor: pointer;
		border: none;
		background: none;
		padding: 0;
		width: 100%;
	}

	.product-image img {
		width: 100%;
		height: auto;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		padding: 10px;
		flex-grow: 1;
	}

	.card-title,
	.card-text {
		margin: 0 0 10px 0;
	}

	.product-price {
		margin: 0;
	}

	.buy-button {
		margin-top: auto;
		align-self: flex-end;
	}

	.btn {
		display: block;
	}
</style>
