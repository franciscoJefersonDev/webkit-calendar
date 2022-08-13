<script lang="ts">
	import { onMount } from 'svelte';
	import { AddManualRipples } from '../components/Ripples';
	import { AddManualAnimatedButtons } from '../components/ButtonAnimated';
	import { auth } from '../store';
	import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';

	const setAnimationsIntoPage = () => {
		const ripplesElements: any = document.querySelectorAll<HTMLElement>('.ripples')!;
		const buttonsAnimateds: any = document.querySelectorAll<HTMLElement>('.btn-animated')!;
		AddManualRipples(ripplesElements);
		AddManualAnimatedButtons(buttonsAnimateds);
	};
	onMount(() => {
		const signInWithGoogleButton: any =
			document.querySelector<HTMLButtonElement>('.sign-in-with-google')!;
		setAnimationsIntoPage();
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/calendar');
		auth.subscribe((value) => {
			onAuthStateChanged(value, (user) => {
				if (user) {
					goto('/login', {
						replaceState: true,
						noscroll: true,
						keepfocus: true
					});
				} else {
					const onSignInWithGoogle = () => {
						signInWithPopup(value, provider)
							.then((result) => {
								const credential = GoogleAuthProvider.credentialFromResult(result);
								const user = result.user;
								console.log(user);
								goto('/');
							})
							.catch((error) => {
								const errorCode = error.code;
								const errorMessage = error.message;
								const email = error.customData.email;
								const credential = GoogleAuthProvider.credentialFromError(error);
								console.log(error);
							});
					};
					signInWithGoogleButton.addEventListener('click', () => {
						onSignInWithGoogle();
					});
				}
			});
		});
	});
</script>

<main class="login">
	<h3 class="login__title">Calendar</h3>
	<button class="login__button ripples btn-animated sign-in-with-google">
		<i class="icon ion-logo-google" />
		Login with Google
	</button>
</main>

<style lang="scss">
	@use '../styles/mixins' as mixins;
	.login {
		width: 100%;
		height: 100%;
		background-color: rgb(var(--bg-color));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		row-gap: 1.5em;
		&__title {
			font-size: calc(var(--fs) + 0.7em);
			font-weight: 400;
			color: rgb(var(--text-color));
		}
		&__button {
			width: 95%;
			height: 50px;
			max-width: 500px;
			border-radius: var(--brd-radius);
			column-gap: 0.5em;
			padding: 0.5em;
			background-color: rgb(var(--bg-primary));
			color: rgb(255, 255, 255);
			cursor: pointer;
			@include mixins.button-reset;
			@include mixins.flex-center-center;
			@include mixins.ripples;
			@include mixins.btn-animated;
			--rp-color: rgba(255, 255, 255, 0.2);
			--rp-transition: 200;
		}
	}
</style>
