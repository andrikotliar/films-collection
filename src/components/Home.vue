<template>
	<div class="page container">
		<Search />
		<Category property="year" :category="previousYear" title="The newest films" link="years" reverse />
		<FilmsCategory />
		<Category property="categories" category="special-favorite" title="The most favorite films" />
		<Category property="categories" category="most-watched" title="The most watched films" reverse />
		<Category property="categories" category="cinema-watched" title="Cinema watched films" reverse />
		<Category property="categories" category="series" title="TV Series" reverse />
		<Category property="categories" category="marvel" title="Marvel Cinematic Universe" reverse />
		<YearsCategory />
	</div>
</template>

<script>
	import Search from './parts/Search.vue';
	import Category from './categories/Category.vue';
	import FilmsCategory from './categories/AllFilmsCategory.vue';
	import YearsCategory from './categories/YearsCategory.vue';
	export default {
		name: 'Home',
		data() {
			return {
				currentYear: new Date().getFullYear()
			}
		},
		computed: {
			previousYear() {
				return this.currentYear - 1;
			}
		},
		components: {
			Search,
			Category,
			FilmsCategory,
			YearsCategory
		}
	}
</script>

<style>
	.movie {
		transition: .3s;
		position: relative;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		width: 160px;
		height: 230px;
		background-color: #eee;
	}
	.movie:hover {
		box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
	}
	@media (max-width: 1200px) {
		.movie {
			margin-right: 20px;
			flex-shrink: 0;
		}
	}

	@media (max-width: 1040px) {
		.movie {
			width: 140px;
			height: 210px;
		}
	}
	.movie__link img {
		width: 100%;
		height: 100%;
		display: block;
	}
	.movie--all:hover {
		box-shadow: none;
		background-color: #d0d0d0;		
	}

	.movie a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		font-size: 18px;
		text-align: center;
	}

	.movie--double {
		display: flex;
		flex-direction: column;
		gap: 20px;
		background-color: transparent;
	}

	.movie--double:hover {
		background-color: transparent;
	}

	.movie--double a {
		height: 50%;
		background-color: #f2f2f2;
		transition: .3s;
	}

	.movie--double a:hover {
		background-color: #d0d0d0;
	}
</style>