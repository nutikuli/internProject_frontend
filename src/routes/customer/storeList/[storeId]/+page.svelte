<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../../components/navbarCustomer.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	let products = data.product;
	console.log('Product data', products);

	function gotoDetail(id) {
		goto(`/customer/product/${id}`);
	}

	let selectedValue = '1'; // Default sorting option

	sortProducts();

	function sortProducts() {
		switch (selectedValue) {
			case '2': // Sort by price - high to low
				products = [...products].sort((a, b) => b.product_data.price - a.product_data.price);
				console.log('high to low');
				break;
			case '3': // Sort by price - low to high
				products = [...products].sort((a, b) => a.product_data.price - b.product_data.price);
				console.log('low to high');
				break;
			case '4': // Sort by latest products
				products = [...products].sort((a, b) => b.product_data.id - a.product_data.id);
				console.log('latest products');
				break;
			case '5': // Sort by oldest products
				products = [...products].sort((a, b) => a.product_data.id - b.product_data.id);
				console.log('oldest products');
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

	let searchQuery = '';
	let searchResults = null;

	function handleSearch(event) {
		searchQuery = event.detail.query.toLowerCase();
		searchResults = products.filter((products) =>
			products.product_data.name.toLowerCase().includes(searchQuery)
		);
	}

	let sortBy = '';
	function sortItems() {
		if (sortBy === 'priceLowToHigh') {
			products = [...products].sort((a, b) => a.product_data.price - b.product_data.price);
		} else if (sortBy === 'priceHighToLow') {
			products = [...products].sort((a, b) => b.product_data.price - a.product_data.price);
		} else if (sortBy === 'OldToNew') {
			products = [...products].sort((a, b) => a.product_data.id - b.product_data.id);
		} else if (sortBy === 'NewToOld') {
			products = [...products].sort((a, b) => b.product_data.id - a.product_data.id);
		}
	}

	function sortItemsSearch() {
		if (sortBy === 'priceLowToHigh') {
			searchResults = [...searchResults].sort(
				(a, b) => a.product_data.price - b.product_data.price
			);
		} else if (sortBy === 'priceHighToLow') {
			searchResults = [...searchResults].sort(
				(a, b) => b.product_data.price - a.product_data.price
			);
		} else if (sortBy === 'OldToNew') {
			searchResults = [...searchResults].sort((a, b) => a.product_data.id - b.product_data.id);
		} else if (sortBy === 'NewToOld') {
			searchResults = [...searchResults].sort((a, b) => b.product_data.id - a.product_data.id);
		}
	}
	onMount(sortItems);
	onMount(sortItemsSearch);
</script>

<NavbarCustomer id={data.customer_account.id} on:search={handleSearch} />
<div class="showProduct">
	{#if searchResults !== null}
		{#if searchResults.length > 0}
			<div class="sort-container">
				<span class="sort-label">จัดเรียงตาม</span>
				<select class="form-select" bind:value={sortBy} on:change={sortItemsSearch}>
					<option value="">--select--</option>
					<option value="priceLowToHigh">ราคา น้อยไปมาก</option>
					<option value="priceHighToLow">ราคา มากไปน้อย</option>
					<option value="OldToNew">สินค้าเก่าสุด</option>
					<option value="NewToOld">สินค้าล่าสุด</option>
				</select>
			</div>
			<div class="row">
				{#each searchResults as result}
					<div class="product-list card col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
						<button
							type="button"
							class="product-image"
							on:click={() => gotoDetail(result.product_data.id)}
							aria-label={`View details of ${result.product_data.name}`}
						>
							{#if result.files_data.length > 0}
								<img
									src={`http://${result.files_data[0].file_data}`}
									alt={result.product_data.name}
								/>
							{/if}
						</button>
						<div class="card-body">
							<h5 class="card-title">{result.product_data.name}</h5>
							<p class="card-text">{result.product_data.detail}</p>
							<div class="row justify-content-between align-products-end">
								<div class="col-auto d-flex align-products-center">
									<Icon icon="tabler:currency-bath" width="25" height="25" />
									<p class="product-price">{result.product_data.price}</p>
								</div>
								<div class="col-auto buy-button">
									<a href="customer-cart/id" class="btn btn-primary">ซื้อเลย</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{:else if searchResults === null}
		<div class="sort-container">
			<span class="sort-label">จัดเรียงตาม</span>
			<select class="form-select" bind:value={sortBy} on:change={sortItems}>
				<option value="">--select--</option>
				<option value="priceLowToHigh">ราคา น้อยไปมาก</option>
				<option value="priceHighToLow">ราคา มากไปน้อย</option>
				<option value="OldToNew">สินค้าเก่าสุด</option>
				<option value="NewToOld">สินค้าล่าสุด</option>
			</select>
		</div>
		<div class="row">
			{#if products.length === 0}
				<h2 class="no-product d-flex justify-content-center align-products-center">
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
						<div class="row justify-content-between align-products-end">
							<div class="col-auto d-flex align-products-center">
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
	{/if}
</div>

<!-- <div class="showProduct">
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
			<h2 class="no-product d-flex justify-content-center align-products-center">
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
					<div class="row justify-content-between align-products-end">
						<div class="col-auto d-flex align-products-center">
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
</div> -->

<style>
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
		width: 100%;
		height: 230px;
	}

	.card {
		width: 230px;
		height: 400px;
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
