<script>
	import Icon from '@iconify/svelte';
	import NavbarCustomer from '../../../components/navbarCustomer.svelte';
	function gotoDetail() {
		window.location.href = '/product/id';
	}

	import { loadAll } from './+page.server.js';
	import { onMount } from 'svelte';

  let products = [];
  let error = null;

  // Define a method to load all products
  async function loadProducts() {
    const { products: loadedProducts, error: loadingError } = await loadAll();
    if (loadingError) {
      // Handle error if there's any
      error = loadingError;
    } else {
      // Set the products if loaded successfully
      products = loadedProducts;
    }
  }

  // Call the loadProducts method when the component is mounted
  onMount(loadProducts);
</script>

<div>
	<NavbarCustomer />
	<div class="showProduct">
		<!-- sort -->
		<div style="display: flex; padding-bottom: 20px">
			<span style="margin-right: 10px; margin-top: 10px;">จัดเรียงตาม</span>

			<select class="form-select" id="input" style="width: 200px;">
				<option selected>--select--</option>
				<option value="1">ราคา มากไปน้อย</option>
				<option value="2">ราคา น้อยไปมาก</option>
				<option value="3">สินค้าล่าสุด</option>
				<option value="4">สินค้าเก่าสุด</option>
			</select>
		</div>

		<!-- sort -->
		<!-- productList -->
		{#each products as product}
		<div class="card" style="width: 18rem;" on:click={gotoDetail}>
			<img src="/src/lib/image/cyberpunk.jpg" class="card-img-top" alt="..." />
			<div class="card-body">
				<h5 class="card-title">{product.name}</h5>
				<p class="card-text">{product.detail}</p>
				<div class="row justify-content-between">
					<div class="col-auto d-flex align-items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="25"
							viewBox="0 0 24 24"
							{...$$props}
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
						<a href="#" class="btn btn-primary">ซื้อเลย</a>
					</div>
				</div>
			</div>
		</div>
		{/each}
		<!-- productList -->
	</div>
</div>

<style>
	.showProduct {
		margin-top: 30px;
		margin-left: 80px;
		margin-right: 80px;
		align-items: center;
	}
	.bi {
		margin-top: 5px;
	}
</style>
