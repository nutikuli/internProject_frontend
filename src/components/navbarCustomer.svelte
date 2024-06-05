<script>
    import Icon from '@iconify/svelte';
	function gotoCart() {
		window.location.href = '/customer/customer-cart/id';
	}
</script>

<div class="header-container">
	<form class="d-flex" role="search">
		<div>Payso Shop</div>
		<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
		<button class="btn btn-light me-2" type="submit">ค้นหา</button>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<svg
			on:click={gotoCart}
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			color="white"
			fill="currentColor"
			class="bi bi-pencil-square mx-1"
			viewBox="0 0 576 512"
            style="margin-top: 5px;"
			{...$$props}
		>
			<path
				fill="currentColor"
				d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994c-29.823-.429-54.35-24.631-55.155-54.447c-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938c-28.54-1.325-51.751-24.385-53.251-52.917c-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320M403.029 192H360v-60c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v60h-43.029c-10.691 0-16.045 12.926-8.485 20.485l67.029 67.029c4.686 4.686 12.284 4.686 16.971 0l67.029-67.029c7.559-7.559 2.205-20.485-8.486-20.485"
			/>
		</svg>
	</form>
</div>

<style>
    .header-container {
		align-items: center;
		background-color: #0d6efd;
		padding: 30px;
		padding-left: 80px;
		padding-right: 80px;
	}
	.header-container div {
		margin-right: 10px;
		margin-top: 5px;
		font-size: larger;
		font-weight: 600;
		color: #ffffff;
	}
	.header-container input {
		flex: 1;
	}
</style>