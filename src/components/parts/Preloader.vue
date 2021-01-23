<template>
	<div class="preloader" :style="`top: ${position}px`" v-if="!loaded">
		<div class="container">
			<img src="images/icons/preloader.svg" alt="">			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Preloader',
		props: ['position'],
		data() {
			return {
				loaded: false
			}
		},
		methods: {
			hideLoader() {
				this.loaded = true;
			}
		},
		watch: {
			'$route'() {
				this.loaded = false;
				setTimeout(this.hideLoader, 1000);
			}
		},
		mounted() {
			setTimeout(this.hideLoader, 1000);
		}
	}
</script>

<style>
	.preloader {
		position: absolute;
		left: 0;
		background-color: #fff;
		z-index: 99999;
		width: 100%;
		height: 100%;
	}

	.preloader--hidden {
		opacity: 0;
		visibility: hidden;
	}
</style>