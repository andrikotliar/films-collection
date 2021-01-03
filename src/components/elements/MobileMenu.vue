<template>
	<div class="mobile-menu">
		<div class="mobile-menu__icon" @click="showMobileMenu">
			<span></span>
		</div>
		<ul class="mobile-menu__list">
			<li class="mobile-menu__item" v-for="item in menu" @click="closeMobileMenu">
				<router-link :to="item.link" class="mobile-menu__link">
					{{item.title}}
				</router-link>
			</li>
			<li class="mobile-menu__item">
				<a href="https://cinemarticles.netlify.app" class="mobile-menu__link">
					Articles
				</a>
			</li>
		</ul>		
	</div>
</template>

<script>
	export default {
		name: 'MobileMenu',
		data() {
			return {
				menu: [
					{
						id: 1,
						title: 'Home', 
						link: '/' 
					},
					{
						id: 2,
						title: 'List', 
						link: '/list' 
					}, 
					{
						id: 3,
						title: 'Films', 
						link: '/films/1' 
					}, 
					{
						id: 4,
						title: 'Trailers', 
						link: '/trailers' 
					}, 
					{
						id: 5,
						title: 'Twitter', 
						link: '/twitter' 
					}
				]
			}
		},
		methods: {
			showMobileMenu() {
				const mobileMenuList = document.querySelector('.mobile-menu__list');
				const mobileMenuIcon = document.querySelector('.mobile-menu__icon');
				mobileMenuIcon.classList.toggle('mobile-menu__icon--close');
				mobileMenuList.classList.toggle('mobile-menu__list--show');
			},
			closeMobileMenu() {
				const mobileMenuList = document.querySelector('.mobile-menu__list');
				const mobileMenuIcon = document.querySelector('.mobile-menu__icon');
				mobileMenuIcon.classList.remove('mobile-menu__icon--close');
				mobileMenuList.classList.remove('mobile-menu__list--show');
			}
		}
	}
</script>

<style src="stylesElems/mobile-menu.css"></style>