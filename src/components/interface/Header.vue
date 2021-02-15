<template>
	<header class="header">
		<div class="container header__container">
			<div class="logo">
				<router-link to="/"> 
					<img src="images/logo/logo.svg" alt="Films Collection">
				</router-link>
			</div>
			<ul class="header__menu">
				<li v-for="item in menu" class="header__menu-item" :key="item.id">
					<router-link :to="item.link" class="header__menu-link">{{item.title}}</router-link>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'headerMenu',
		data () {
			return {
				menu: [
					{
						id: 1,
						title: 'Films', 
						link: '/films/1' 
					},
					{
						id: 2,
						title: 'Calender', 
						link: '/calender' 
					}, 
					{
						id: 3,
						title: 'Trailers', 
						link: '/trailers' 
					}
				]
			}
		}
	}
</script>

<style>
	.header {
		background-color: var(--base-color);
		padding: 12px 0; 
		position: relative;
	}

	.header__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header__menu {
		display: flex;
		color: #fff;
		font-size: 18px;
	}

	@media (max-width: 550px) {
		.header__container {
			flex-direction: column;
		}

		.header__menu {
			margin-top: 10px;
		}
	}

	.header__menu-item {
		margin-right: 40px;
		transition: .3s;	
	}

	.header__menu-item:hover {
		color: var(--base-color-light);
	}

	.header__menu-item .router-link-active {
		color: var(--base-color-light);
	}

	.header__menu-item:last-child {
		margin-right: 0;
	}
</style>