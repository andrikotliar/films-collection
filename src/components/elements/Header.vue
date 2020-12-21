<template>
	<header class="header">
		<div class="container">
			<div class="logo">
				<router-link to="/"> 
					<img src="images/logo/logo.svg" alt="Films Collection">
				</router-link>
			</div>
			<ul class="top-menu">
				<li v-for="item in menu" class="top-menu__item" :key="item.id">
					<router-link :to="item.link" class="top-menu__link">{{item.title}}</router-link>
				</li>
				<li class="top-menu__item">
					<a href="https://cinemarticles.netlify.app" target="_blank">Articles</a>
				</li>
			</ul>
			<div class="mobile-menu-icon" @click="mobMenu">
				<img src="images/icons/menu.svg" alt="Menu Icon">
			</div>
			<div class="mobile-menu">
				<ul class="mobile-menu__list">
					<li v-for="item in menu" class="mobile-menu__item" @click="closeMenu" :key="item.id">
						<router-link :to="item.link" class="top-menu__link">{{item.title}}</router-link>
					</li>
					<li class="mobile-menu__item">
						<a href="https://cinemarticles.netlify.app" target="_blank">Articles</a>
					</li>
				</ul>
				<div class="close-icon" @click="closeMenu">
					<img src="images/icons/close.svg" alt="Close Icon">
				</div>				
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'headerMenu',
		data () {
			return {
				menu: [],
				twitter: ['Posters', 'Promo', 'Filming', 'Moments']
			}
		},

		methods: {
			mobMenu () {
				document.querySelector('.mobile-menu').classList.add('showMobileMenu');
			},
			closeMenu() {
				document.querySelector('.mobile-menu').classList.remove('showMobileMenu');
			}
		},

		created() {
			this.menu = [
				{
					id: 1,
					title: 'List', 
					link: '/list' 
				}, 
				{
					id: 2,
					title: 'All films', 
					link: '/all_films/1' 
				}, 
				{
					id: 3,
					title: 'New trailers', 
					link: '/trailers' 
				}, 
				{
					id: 4,
					title: 'Twitter', 
					link: '/twitter' 
				}
			]	
		}
	}
</script>

<style src="stylesElems/header.css"></style>