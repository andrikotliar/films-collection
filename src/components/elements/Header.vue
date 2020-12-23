<template>
	<header class="header">
		<div class="container header__container">
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
				],
				twitter: ['Posters', 'Promo', 'Filming', 'Moments']
			}
		}
	}
</script>

<style src="stylesElems/header.css"></style>