<script>
	import { page } from '$app/stores';

	/**
	 * Represents a route injection object.
	 * @typedef {Object} RouteInjection
	 * @property {string} hrefTarget - The target URL of the route.
	 * @property {string} routeName - The name of the route.
	 */

	/** @type {RouteInjection[]} */
	export let routes = [];

	/**
	 * Determines if a route should be active based on the current path.
	 * @param {RouteInjection} injection - The route injection object.
	 * @param {string} currentPath - The current path.
	 * @returns {boolean} - 'active' if the route should be active, otherwise an empty string.
	 */
	export function shouldBeActive(injection, currentPath) {
		return injection.hrefTarget === currentPath;
	}

	$: currentPath = $page.url.pathname;
</script>

<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
	<a
		href="/"
		class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
	>
		<svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
		<span class="fs-4">Sidebar</span>
	</a>
	<hr />
	<ul class="nav nav-pills flex-column mb-auto">
		<li class="nav-item">
			{#each routes as r}
				<a
					href={r.hrefTarget}
					class:active={shouldBeActive(r, currentPath)}
					class={'nav-link active'}
					aria-current="page"
				>
					<svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
					{r.routeName}
				</a>
			{/each}
		</li>
	</ul>
	<hr />
</div>
