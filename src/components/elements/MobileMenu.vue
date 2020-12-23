<template>
	<ul class="mobile-menu">
		<li class="mobile-menu__item" v-for="item in menu">
			<router-link :to="item.link" class="mobile-menu__link">
				<img :src="`images/icons/mobile/${item.icon}.svg`" alt="">
			</router-link>
		</li>
		<li class="mobile-menu__item">
			<a href="https://cinemarticles.netlify.app" class="mobile-menu__link">
				<img src="images/icons/mobile/bookmark.svg" alt="">
			</a>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'MobileMenu',
		data() {
			return {
				menu: [
					{
						id: 1,
						icon: 'home', 
						link: '/' 
					},
					{
						id: 2,
						icon: 'list', 
						link: '/list' 
					}, 
					{
						id: 3,
						icon: 'films', 
						link: '/all_films/1' 
					}, 
					{
						id: 4,
						icon: 'trailers', 
						link: '/trailers' 
					}, 
					{
						id: 5,
						icon: 'twitter', 
						link: '/twitter' 
					}
				]
			}
		}
	}
</script>

<style src="stylesElems/mobile-menu.css"></style>