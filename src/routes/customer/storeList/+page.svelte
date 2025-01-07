<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../components/navbarCustomer.svelte';
	import { goto } from '$app/navigation';

	export let data;
	const stores = data.store;
	const files = data.store.files_data;
	console.log('Store data:', stores);

	function gotoDetail(id) {
		goto(`/customer/storeList/${id}`);
		console.log('go to product detail.');
	}

	let showLoading = false;
	// Function to simulate loading progress

	function startLoading() {
		showLoading = true;
	}
	//////////////////////////

	let searchQuery = '';
	let searchResults = null;

	function handleSearch(event) {
		searchQuery = event.detail.query.toLowerCase();
		searchResults = stores.filter((stores) =>
			stores.store_data.store_name.toLowerCase().includes(searchQuery)
		);
		console.log("searchResult",searchResults)
	}
</script>

<NavbarCustomer id={data.customer_account.id} on:search={handleSearch} />
<div class="showstore">
	<div class="row">
		{#if searchResults !== null}
			{#if searchResults.length > 0}
				{#each searchResults as result}
					<div class="store-list card col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
						<button
							type="button"
							class="store-image"
							on:click={() => {
								startLoading();
								gotoDetail(result.store_data.id);
							}}
							aria-label={`View details of ${result.store_data.store_name}`}
						>
							{#if result.files_data.length > 0}
								<img
									src={`http://${result.files_data[0].file_data}`}
									alt={result.store_data.store_name}
								/>
							{:else}
								<img src={result.files_data.file_data} alt={result.store_data.store_name} />
							{/if}
						</button>
						<h5 class="card-title">{result.store_data.store_name}</h5>
						<p class="card-text">{result.store_data.email}</p>
						<div class="row justify-content-between align-items-end">
							<div class="col-auto d-flex align-items-center">
								<div class="store-price">{result.store_data.phone}</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		{:else}
			{#each stores as store}
				<div class="store-list card col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
					<button
						type="button"
						class="store-image"
						on:click={() => {
							startLoading();
							gotoDetail(store.store_data.id);
						}}
						aria-label={`View details of ${store.store_data.store_name}`}
					>
						{#if store.files_data.length > 0}
							<img
								src={`http://${store.files_data[0].file_data}`}
								alt={store.store_data.store_name}
							/>
						{:else}
							<img src={store.files_data.file_data} alt={store.store_data.store_name} />
						{/if}
					</button>
					<h5 class="card-title">{store.store_data.store_name}</h5>
					<p class="card-text">{store.store_data.email}</p>
					<div class="row justify-content-between align-items-end">
						<div class="col-auto d-flex align-items-center">
							<div class="store-price">{store.store_data.phone}</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

{#if showLoading}
	<div class="loading-overlay d-flex justify-content-center align-items-center">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.65);
		z-index: 1050;
	}
	.showstore {
		margin: 10px;
		margin-left: 80px;
	}

	.store-list {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 10px;
		height: 100%;
	}

	.store-image {
		cursor: pointer;
		border: none;
		background: none;
		padding: 2px;
		padding-bottom: 10px;
		width: 100%;
	}

	.store-image img {
		width: 200px;
		height: 200px;
	}

	.card {
		max-width: max-content;
		padding: 4px;
		height: 340px;
	}

	.card-title,
	.card-text {
		margin: 0 0 10px 0;
	}

	.store-price {
		margin: 0;
	}
</style>
