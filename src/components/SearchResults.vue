<template>
	<div class="page container">
		<h2 class="category-title category-title--lower">Results for "{{result}}"</h2>
		<div class="category-films">
			<router-link :to="'/film/' + film.id" v-for="(film, index) in showResults" class="category-film" :key="index">
				<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="category-film__poster">
			</router-link>
			<div class="not-found" v-if="error">
				Films not found
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'SearchResults',
		props: ['result'],
		data() {
			return {
				error: false,
				loadMore: false,
				slice: 18
			}
		},
		computed: {
			...mapState(['films']),
			showResults() {
				let regex = new RegExp(this.result, "i");
				let filteredFilms = this.films.filter(film => regex.test(film.title));
				if(filteredFilms.length != 0) {
					return filteredFilms;
				}
				else {
					this.error = true;
				}
			}
		},
		created() {
			this.$store.dispatch('LOAD_FILMS');
		},
		mounted() {
			sessionStorage.setItem('filmsNotFound', false);
			this.error = JSON.parse(sessionStorage.getItem('filmsNotFound'));
		}
	}
</script>