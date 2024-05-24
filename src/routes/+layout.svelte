<script>
	import './../app.css';
	import Sidebar from './../components/Sidebar.svelte';
	import Navbar from './../components/Navbar.svelte';
	import { page } from '$app/stores';

	let storeId = 0;
	let adminId = 0;

	/**
	 * Represents a route injection object.
	 * @typedef {Object} RouteInjection
	 * @property {string} hrefTarget - The target URL of the route.
	 * @property {string} routeName - The name of the route.
	 */

	/** @type {RouteInjection[]} */
	const sidebarRoutes = [
		// admin routes
		{ hrefTarget: `/admin/${adminId}/role-management`, routeName: 'สิทธ์ใช้งาน' },
		{ hrefTarget: `/admin/${adminId}/super-admin`, routeName: 'ผู้ดูแลระบบ' },
		{ hrefTarget: `/admin/${adminId}/store-management`, routeName: 'ผู้ขาย' },
		{ hrefTarget: `/admin/${adminId}/customer-management`, routeName: 'ลูกค้า' },
		{ hrefTarget: `/admin/${adminId}log-management`, routeName: 'Log' },

		// store routes
		{ hrefTarget: `/store/${storeId}product-management`, routeName: 'สินค้า' },
		{ hrefTarget: `/store/${storeId}product-category-management`, routeName: 'หมวดหมู่' },
		{ hrefTarget: `/store/${storeId}/order-management`, routeName: 'รายการธุรกรรม' }
	];

	$: currentPath = $page.url.pathname;
</script>

{#if currentPath.split('/').length > 2}
	<div
		style="background-color: #f8f9fa !important;"
		class="h ibm-plex-sans-thai-regular text-foreground"
	>
		<slot name="navbar">
			<Navbar />
		</slot>
		<div class="row">
			{#if !currentPath.startsWith('/customer')}
				<slot name="sidebar">
					<div class="col">
						<Sidebar routes={sidebarRoutes} />
					</div>
				</slot>
			{/if}

			<div class="col-9">
				<div class="container pt-4 bg-background">
					<slot></slot>
				</div>
			</div>
		</div>
		<slot name="footer"></slot>
	</div>
{:else}
	<div
		style="background-color: #f8f9fa !important;"
		class="h ibm-plex-sans-thai-regular text-foreground"
	>
		{#if currentPath === '/'}
			<slot name="navbar">
				<Navbar />
			</slot>
		{/if}
		<div class=" pt-4 bg-background">
			<slot></slot>
		</div>
		<slot name="footer"></slot>
	</div>
{/if}

<style>
	.h {
		min-height: 100vh;
	}

	@media (min-width: 1024px) {
		.h {
			height: 100%;
		}
	}
</style>
