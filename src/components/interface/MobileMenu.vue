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

<style>
	.mobile-menu {
		display: none;
	}

	@media (max-width: 550px) {
		.mobile-menu {
			display: block;
		}
		.mobile-menu__icon {
			position: fixed;
			bottom: 0;
			right: 20px;
			display: flex;
			align-items: center;
			width: 70px;
			height: 60px;
			background-color: var(--base-color);
			padding: 20px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			box-shadow: 2px 0 5px rgba(0,0,0,.5);
			transition: .3s;
			z-index: 999;
		}
		.mobile-menu__icon span {
			display: block;
			width: 100%;
			height: 3px;
			background-color: #fff;
			position: relative;
			transition: .3s;
		}
		.mobile-menu__icon span:before,
		.mobile-menu__icon span:after {
			position: absolute;
			display: block;
			width: 100%;
			height: 100%;
			background-color: #fff;
			content: '';
			transition: .3s; 
		}
		.mobile-menu__icon span:before {
			top: -10px;
		}
		.mobile-menu__icon span:after {
			top: 10px;
		}
		.mobile-menu__icon--close {
			box-shadow: none;
		}
		.mobile-menu__icon--close span {
			background-color: var(--base-color);
		}
		.mobile-menu__icon--close span:before,
		.mobile-menu__icon--close span:after {
			top: 0;
		}
		.mobile-menu__icon--close span:before {
			transform: rotate(45deg);
		}
		.mobile-menu__icon--close span:after {
			transform: rotate(-45deg);
		}
		.mobile-menu__list {
			position: fixed;
			bottom: 0;
			left: 0;
			font-size: 20px;
			color: #fff;
			width: 100%;
			background-color: var(--base-color);
			padding-left: 5%;
			padding-right: 5%;
			padding-bottom: 50px;
			padding-top: 20px;
			text-align: center;
			box-shadow: 2px 0 5px rgba(0,0,0,.5);
			transform: translateY(100%);
			transition: transform .3s ease;
		}
		.mobile-menu__list--show {
			transform: translateY(0);
		}
		.mobile-menu__item {
			overflow: hidden;
		}
		.mobile-menu__link {
			display: block;
			text-transform: uppercase;
			padding: 15px 0;
			transform: translateY(100%);
			transition: .3s;
			transition-delay: .3s;
		}
		.mobile-menu__link.router-link-exact-active {
			background-color: rgba(255,255,255,.3);
		}
		.mobile-menu__list--show .mobile-menu__link {
			transform: translateY(0);
		}
	}
</style>