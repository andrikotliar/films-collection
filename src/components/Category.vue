<template>
	<div class="page container">
		<h2 class="category-title">{{pageTitle}}</h2>
		<div class="category-films">
			<div v-for="film in filteredFilms" class="category-film">
				<router-link :to="'/film/' + film.id" class="category-film__link">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="category-film__poster">
				</router-link>
			</div>
			<div class="not-found" v-if="error">
				Films not found
			</div>
			<div class="load-more" v-if="loadMore">
				<button @click="loadMoreBtn" class="load-more__btn">Load more</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: 'Category',
		props: ['category'],
		data() {
			return {
				title: '',
				error: false,
				loadMore: false,
				slice: 18
			}
		},
		methods: {
			loadMoreBtn() {
				return this.slice += 12;
			}
		},
		computed: {
			...mapState(['films']),
			filteredFilms() {
				let movies = this.films.filter(n => Object.values(n).some(m => JSON.stringify(m).includes(this.category)));
				if(movies.length != 0) {
					if(movies.length > 18) {
						this.loadMore = true;
					}
					if(this.slice >= movies.length) {
						this.loadMore = false;
					}
					return movies.slice(0, this.slice);
				} else {
					this.error = true;
				}
			},
			pageTitle() {
				switch(this.category) {
					case '2019':
						return "The newest films"
						break
					case 'c-fav':
						return "The most favorite films"
						break
					case 'c-mw':
						return "The most watched films"
						break
					case 'c-cw':
						return "The cinema watched films"
						break
					case 'c-tv':
						return "TV series"
						break
					case 'c-marvel':
						return "Marvel Cinematic Universe"
						break
					default:
						return this.category
						break
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

<style src="stylesElems/category.css"></style>