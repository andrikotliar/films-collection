<template>
	<div class="page container">
		<Search />
		<FilmsRow property="year" :category="previousYear" title="The newest films" link="years" reverse />
		<AllFilms />
		<FilmsRow property="categories" category="special-favorite" title="The most favorite films" />
		<FilmsRow property="categories" category="most-watched" title="The most watched films" reverse />
		<FilmsRow property="categories" category="cinema-watched" title="Cinema watched films" reverse />
		<FilmsRow property="categories" category="series" title="TV Series" reverse />
		<FilmsRow property="categories" category="marvel" title="Marvel Cinematic Universe" reverse />
		<FilmsRowYears />
	</div>
</template>

<script>
	import Search from 'elements/Search.vue';
	import FilmsRow from 'elements/Category.vue';
	import AllFilms from 'elements/AllFilmsCategory.vue';
	import FilmsRowYears from 'elements/Years.vue';
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
			FilmsRow,
			AllFilms,
			FilmsRowYears
		}
	}
</script>

<style src="stylesElems/home.css"></style>