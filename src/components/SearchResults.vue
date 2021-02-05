<template>
	<div class="page container">
		<h2 class="category-title category-title--lower">Results for "{{result}}"</h2>
		<CategoryFilms :films="showResults" />
		<div class="not-found" v-if="error">
			Films not found
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	import CategoryFilms from './parts/CategoryFilms';

	export default {
		name: 'SearchResults',
		props: ['result'],
		data() {
			return {
				error: false
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
		},
		components: {
			CategoryFilms
		}
	}
</script>