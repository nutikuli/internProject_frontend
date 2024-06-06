<script context="module">
	import { load } from './+page';

	export { load };
</script>

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
	}
</script>

<NavbarCustomer />
<div class="showstore">
	<div class="row">
		{#each stores as store}
			<div class="store-list card col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
				<button
					type="button"
					class="store-image"
					on:click={() => gotoDetail(store.store_data.id)}
					aria-label={`View details of ${store.store_data.store_name}`}
				>
					<img src={store.files_data.file_data} alt={store.store_data.store_name} />
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
	</div>
</div>

<style>
	.showstore {
		margin: 20px;
		margin-left: 70px;
	}

	.store-list {
		display: flex;
		flex-direction: column;
		margin: 10px;
		height: 100%;
	}

	.store-image {
		cursor: pointer;
		border: none;
		background: none;
		padding: 0;
		width: 70%;
	}

	.store-image img {
		width: 100%;
		height: auto;
	}

	.card{
        max-width: max-content;
    }

	.card-title,
	.card-text {
		margin: 0 0 10px 0;
	}

	.store-price {
		margin: 0;
	}
</style>
