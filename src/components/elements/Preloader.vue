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

<style src="stylesElems/preloader.css"></style>