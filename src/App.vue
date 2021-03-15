<template>
	<div id="app">
		<Header />
		<router-view />	
		<Footer />
	</div>
</template>

<script>
	import Header from 'components/interface/Header.vue';
	import Footer from 'components/interface/Footer.vue';
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
			Footer
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}

	*, :before, :after {
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	li {
		list-style: none;
	}
	button {
		display: block;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		border: none;
		background: none;
		cursor: pointer;
		outline: none;
	}

	body {
		--base-color: #006db7;
		--base-color-light: #9ed8ff;
		font-family: 'Lato', sans-serif;
		font-size: 16px;
	}

	.container {
		padding: 0 12%;
		position: relative;
	}

	@media (max-width: 925px) {
		.container {
			padding: 0 5%; 
		}
	}

	.page {
		position: relative;
		min-height: 600px;
		margin: 40px auto;
	}
</style>