<script>
	import Icon from '@iconify/svelte';
	let props = {
		title: 'Payso Shop'
	};
</script>

<nav class="navbar bg-body">
	<div class="container-fluid">
		<a href="#" class="navbar-brand bg-body fs-3 fw-bold font-bold">{props.title}</a>
		<form class="d-flex align-items-center gap-2" role="search">
			<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
			<div class="dropdown-center dropstart">
				<Icon
					width="36"
					class="dropdown-toggle"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					icon="material-symbols:notifications"
				/>

				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="#">Action</a></li>
					<li><a class="dropdown-item" href="#">Another action</a></li>
					<li><a class="dropdown-item" href="#">Something else here</a></li>
				</ul>
			</div>
			<div class="dropdown-center dropstart">
				<button
					data-bs-toggle="dropdown"
					aria-expanded="false"
					class="dropdown-toggle btn btn-link"
				>
					<Icon width="36" icon="ic:baseline-account-circle" style="color: #4d79ff" />
				</button>

				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="#">Logout</a></li>
					<li><a class="dropdown-item" href="#">Sign in</a></li>
					<li><a class="dropdown-item" href="#">Cart</a></li>
				</ul>
			</div>
		</form>
	</div>
</nav>

<style>

	.container-fluid > :last-child {
		margin-right: 1rem;
	}
	.container-fluid > :first-child {
		margin-left: 2rem;
	}
</style>
