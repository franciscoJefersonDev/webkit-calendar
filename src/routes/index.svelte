<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { auth } from '../store';
	onMount(() => {
		auth.subscribe((value) => {
			onAuthStateChanged(value, (user) => {
				if (user) {
					console.log('auth: ', user);
				} else {
					goto('/login', {
						replaceState: true,
						noscroll: true,
						keepfocus: true
					});
				}
			});
		});
	});
</script>

<main>
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>

<style lang="scss">
	p {
		background-color: red;
	}
</style>
