<template>
	<div class="page container">
		<Search />
		<FilmsCategory />
		<Category property="year" :category="previousYear" title="The newest films" link="years" reverse />
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