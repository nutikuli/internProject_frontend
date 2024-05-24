<script>
	export let data;

	// TODO ภาค -> ทำ Shared Layout ให้ (Sidebar, Navbar, Model) 
</script>

<main style="height: 100vh" class="container text-center">
	<div class="d-flex align-items-center justify-content-center vh-100">
		<h1>{data.props.message}</h1>
		<h1>Welcome to SvelteKit</h1>
	</div>
	<p>Visit <a href="htps://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>
