<script>
	import Icon from '@iconify/svelte';
	let props = {
		title: 'Payso Shop'
	};
</script>

<nav class="navbar bg-body-tertiary">
	<div class="container-fluid">
		<a href="#" class="navbar-brand">{props.title}</a>
		<form class="d-flex" role="search">
			<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
			<button class="btn btn-outline-success" type="submit">Search</button>
			<Icon icon="ic:baseline-account-circle" style="color: #4d79ff" />
		</form>
	</div>
</nav>
