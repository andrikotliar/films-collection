<template>
	<div class="page container">
		<h2 class="category-title"> Films from {{year}} year </h2>
		<Preloader />
		<div class="category-films">
			<div class="category-film" v-for="(film, index) in filmsByYear" :key="index">
				<router-link :to="`/film/${film.id}`" class="category-film__link" :title="film.title">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="category-film__poster">
				</router-link>
			</div>
		</div>
		<YearBottomMenu :year="year" :currentYear="currentYear" />
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	import YearBottomMenu from './parts/YearBottomMenu';
	import Preloader from './parts/Preloader.vue';
	
	export default {
		name: 'Year',
		props: ['year'],
		data() {
			return {
				currentYear: new Date().getFullYear()
			}
		},
		computed: {
			...mapState(['films']),
			filmsByYear() {
				let filmsList = this.films.filter(film => film.year == parseInt(this.year));
				return filmsList;
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		},
		components: {
			Preloader,
			YearBottomMenu
		}
	}
</script>