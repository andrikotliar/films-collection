<template>
	<div id="app">
		<Header />
		<router-view />	
		<Footer />
		<MobileMenu />
	</div>
</template>

<script>
	import Header from 'elements/Header.vue';
	import Footer from 'elements/Footer.vue';
	import MobileMenu from 'elements/MobileMenu.vue';
	if('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('sw.js')
	    .then(() => navigator.serviceWorker.ready.then((worker) => {
	      worker.sync.register('syncdata');
	    }))
	    .catch((err) => console.log(err));
	}
	export default {
		name: 'app',
		components: {
			Header,
			Footer,
			MobileMenu
		}
	}
</script>
<style src="styles/global.css"></style>