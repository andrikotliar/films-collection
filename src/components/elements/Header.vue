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
						title: 'Trailers', 
						link: '/trailers' 
					}, 
					{
						id: 3,
						title: 'Twitter', 
						link: '/twitter' 
					}
				]
			}
		}
	}
</script>

<style src="stylesElems/header.css"></style>