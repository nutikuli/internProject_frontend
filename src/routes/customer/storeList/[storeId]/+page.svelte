<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';
	import { goto } from '$app/navigation';

	export let data;
	let products = data.product;
	console.log('Product data', products);

	function gotoDetail(id) {
		goto(`/customer/product/${id}`);
	}

	let selectedValue = '1'; // Default sorting option

	// Initial sort on load
	sortProducts();

	function sortProducts() {
		switch (selectedValue) {
			case '2': // Sort by price - high to low
				products = [...products].sort((a, b) => b.product_data.price - a.product_data.price);
				break;
			case '3': // Sort by price - low to high
				products = [...products].sort((a, b) => a.product_data.price - b.product_data.price);
				break;
			case '4': // Sort by latest products
				products = [...products].sort((a, b) => b.product_data.id - a.product_data.id);
				break;
			case '5': // Sort by oldest products
				products = [...products].sort((a, b) => a.product_data.id - b.product_data.id);
				break;
			default:
				break;
		}
	}

	function handleSortChange(event) {
		const newValue = event.target.value;
		if (newValue !== selectedValue) {
			selectedValue = newValue;
			sortProducts();
		}
	}
</script>

<NavbarCustomer id={data.customer_account.id} />
<div class="showProduct">
	<div class="sort-container">
		<span class="sort-label">จัดเรียงตาม</span>
		<select class="form-select" bind:value={selectedValue} on:change={handleSortChange}>
			<option value="1">--select--</option>
			<option value="2">ราคา มากไปน้อย</option>
			<option value="3">ราคา น้อยไปมาก</option>
			<option value="4">สินค้าล่าสุด</option>
			<option value="5">สินค้าเก่าสุด</option>
		</select>
	</div>
	<div class="row">
		{#if products.length === 0}
			<h2 class="no-product d-flex justify-content-center align-items-center">
				ไม่มีสินค้าในขณะนี้
			</h2>
		{/if}
		{#each products as product}
			<div class="product-list card col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
				<button
					type="button"
					class="product-image"
					on:click={() => gotoDetail(product.product_data.id)}
					aria-label={`View details of ${product.product_data.name}`}
				>
					{#if product.files_data.length > 0}
						<img
							src={`http://${product.files_data[0].file_data}`}
							alt={product.product_data.name}
						/>
					{/if}
				</button>
				<div class="card-body">
					<h5 class="card-title">{product.product_data.name}</h5>
					<p class="card-text">{product.product_data.detail}</p>
					<div class="row justify-content-between align-items-end">
						<div class="col-auto d-flex align-items-center">
							<Icon icon="tabler:currency-bath" width="25" height="25" />
							<p class="product-price">{product.product_data.price}</p>
						</div>
						<div class="col-auto buy-button">
							<a href="customer-cart/id" class="btn btn-primary">ซื้อเลย</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.no-product {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.sort-container {
		width: 300px;
	}

	.showProduct {
		padding-top: 24px;
		padding-left: 96px;
		padding-right: 96px;
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
	}

	.product-image img {
		width: 320px;
		height: 300px;
	}

	.card {
		width: 340px;
		height: 500px;
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
		font-weight: 700;
		font-size: large;
	}

	.buy-button {
		margin-top: auto;
		align-self: flex-end;
	}

	.btn {
		display: block;
	}
</style>
