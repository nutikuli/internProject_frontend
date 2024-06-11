<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../components/navbarCustomer.svelte';
	import { goto } from '$app/navigation';

	let files = [];
	let loading = true;
	let error = null;

	export let data;
	let products = data.product;

	console.log(products);
	function gotoDetail(id) {
		goto(`/customer/product/${id}`);
	}

	let selectedValue = null; // Initialize selectedValue

	// Function to sort products based on selected value
	function sortProducts() {
		if (selectedValue === '1') {
			products = products.slice().sort((a, b) => b.price - a.price);
		} else if (selectedValue === '2') {
			products = products.slice().sort((a, b) => a.price - b.price);
		} else if (selectedValue === '3') {
			products = products.slice().sort((a, b) => b.id - a.id);
		} else if (selectedValue === '4') {
			products = products.slice().sort((a, b) => a.id - b.id);
		}
	}
</script>

<NavbarCustomer id={data.customer_account.id} />
<div class="showProduct">
	<div class="sort-container">
		<span class="sort-label">จัดเรียงตาม</span>
		<select class="form-select" bind:value={selectedValue} on:change={sortProducts}>
			<option value="1">ราคา มากไปน้อย</option>
			<option value="2">ราคา น้อยไปมาก</option>
			<option value="3">สินค้าล่าสุด</option>
			<option value="4">สินค้าเก่าสุด</option>
		</select>
	</div>
	{#if error}
		<p>Error: {error}</p>
	{:else if products.length === 0}
		<p>No products available.</p>
	{:else}
		<div class="row">
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
						alt={product.product_data.store_name}
					/>
				{:else}
					<img src={product.files_data.file_data} alt={product.product_data.store_name} />
				{/if}
					</button>
					<div class="card-body">
						<h5 class="card-title">{product.product_data.name}</h5>
						<p class="card-text">{product.product_data.detail}</p>
						<div class="row justify-content-between align-items-end">
							<div class="col-auto d-flex align-items-center">
								<Icon icon="tabler:currency-bath" width="25" height="25" />
								<h2 class="product-price">{product.product_data.price}</h2>
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

<style>
	.sort-container {
		width: 300px;
	}

	.showProduct {
		margin: 20px;
		margin-left: 70px;
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
