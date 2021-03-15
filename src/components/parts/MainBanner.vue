<template>
	<router-link to="/films/1" class="main-banner">
		<div class="main-banner__image">
			<img src="images/banners/banner_1.webp" alt="">
		</div>
		<div class="main-banner__text">
			<h1 class="main-banner__title">Films List</h1>
			<span class="main-banner__count">{{films.length}} films</span>			
		</div>
	</router-link>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'MainBanner',
		computed: {
			...mapState(['films']),

		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style>
	.main-banner {
		display: block;
		width: 100%;
		height: 350px;
		margin-bottom: 30px;
		position: relative;
		overflow: hidden;
	}
	.main-banner__image {
		width: 100%;
		height: 100%;
		font-size: 0;
		background-color: var(--base-color);
	}
	.main-banner__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: .3s;
	}
	.main-banner__text {
		color: #fff;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 30px;
		width: 100%;
	}
	.main-banner__title {
		font-size: 60px;
		line-height: 1;
	}
	.main-banner__count {
		font-size: 30px;
		line-height: 1;
	}
	.main-banner:hover .main-banner__image img {
		transform: scale(1.1);
		opacity: .8;
	}
	@media (max-width: 650px) {
		.main-banner {
			height: 250px;
		}
		.main-banner__title {
			font-size: 40px;
		}
		.main-banner__count {
			font-size: 20px;
		}
	}
	@media (max-width: 450px) {
		.main-banner__text {
			flex-direction: column;
		}
		.main-banner__count {
			margin-top: 10px;
		}
	}
</style>