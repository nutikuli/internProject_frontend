<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../components/navbarCustomer.svelte';
    import { goto } from '$app/navigation';

	let products = [];
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			const response = await fetch('http://127.0.0.1:8080/api/v1/product/get-products');
			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}
			const data = await response.json();
			console.log('Fetched data:', JSON.stringify(data, null, 2)); // Log fetched data to inspect its structure

			// Assuming the fetched data has a specific structure to extract product_data
			if (Array.isArray(data)) {
				products = data.map((item) => (item.product_data ? item.product_data : item));
			} else if (data && data.result && Array.isArray(data.result)) {
				products = data.result.map((item) => (item.product_data ? item.product_data : item));
			} else {
				throw new Error('Fetched data is not in expected format');
			}
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	console.log(products);
	function gotoDetail(id) {
        goto(`/product/${id}`);
    }
</script>

{#if loading}
	<p>Loading...</p>
{:else if error}
	<p>Error: {error}</p>
{:else}
	<NavbarCustomer />
	<div class="showProduct">
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
		{#if error}
			<p>Error: {error}</p>
		{:else if products.length === 0}
			<p>No products available.</p>
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
							<img src={product.product_avatar} alt={product.name} />
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
{/if}

<style>
	.sort-container {
		width: 300px;
	}

	.showProduct {
		margin: 20px;
	}

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
