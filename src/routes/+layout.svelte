<script>
	import Sidebar from './../components/Sidebar.svelte';
	import Navbar from './../components/Navbar.svelte';

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
</script>

<div class="container-fluid bg-background text-foreground">
	<slot name="navbar">
		<Navbar />
	</slot>
	<slot name="sidebar">
		<Sidebar />
	</slot>

	<div class="container vh-100">
		<slot></slot>
	</div>
	<slot name="footer"></slot>
</div>
