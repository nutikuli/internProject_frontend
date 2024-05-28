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
		return injection.hrefTarget.split('/').slice(-1)[0] === currentPath.split('/').slice(-1)[0];
	}

	$: currentPath = $page.url.pathname;
</script>

<nav id="sidebarMenu" class=" d-xl-block sidebar sidebar-sticky collapse bg-white">
	<div class="position-sticky">
		<div class="list-group list-group-flush mx-3 mt-4">
			<ul class="nav nav-pills flex-column mb-auto">
				<li class="nav-item menu-text">
					<span class="fs-5"> {currentPath.startsWith('/admin') ? 'Admin' : 'Store'} </span>
					{#each routes as r}
						<a
							href={r.hrefTarget}
							class:active={shouldBeActive(r, currentPath)}
							class={'nav-link  '}
							aria-current="page"
						>
							{r.routeName}
						</a>
						<hr />
					{/each}
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	.menu-text:hover {
		background-color: var(primary);
		transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
			transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}

	.nav-item > * {
		margin-bottom: 0.25rem;
		margin-top: 0.3rem;
	}

	.sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		padding: 1rem 0 0; /* Height of navbar */
		box-shadow:
			0 2px 5px 0 rgb(0 0 0 / 5%),
			0 2px 10px 0 rgb(0 0 0 / 5%);
		z-index: 600;
	}

	@media (max-width: 1140px) {
		.sidebar {
			width: 100%;
		}
	}
	.sidebar .active {
		border-radius: 5px;
		box-shadow:
			0 2px 5px 0 rgb(0 0 0 / 16%),
			0 2px 10px 0 rgb(0 0 0 / 12%);
	}

	.sidebar-sticky {
		position: relative;
	}
</style>
