<template>
	<div class="page container">
		<h2 class="category-title">{{pageTitle.replace(/\-/g, ' ')}}</h2>
		<div class="category-films">
			<router-link :to="'/film/' + film.id" v-for="(film, index) in shortedFilmsList" class="category-film" :key="index">
				<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="category-film__poster">
			</router-link>
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
			setCategory() {
				let filmProperty = this.$route.path.split('/')[1];
				if(this.$route.path.split('/')[1] == 'search') {
					filmProperty = 'title';
				}
				let filmCategory = this.category;
				let filteredFilms;
				if(/^[0-9]+$/.test(this.category)) {
					filteredFilms = this.films.filter(film => film[filmProperty] == filmCategory);
				}
				else {
					filteredFilms = this.films.filter(film => film[filmProperty].includes(filmCategory));
				}
				return filteredFilms;
			},
			shortedFilmsList() {
				if(this.setCategory.length != 0) {
					if(this.setCategory.length > 18) {
						this.loadMore = true;
					}
					if(this.slice >= this.setCategory.length) {
						this.loadMore = false;
					}
					return this.setCategory.slice(0, this.slice);
				} else {
					this.error = true;
				}
			},
			pageTitle() {
				switch(this.category) {
					case '2019':
						return "The newest films"
						break
					case 'special-favorite':
						return "The most favorite films"
						break
					case 'most-watched':
						return "The most watched films"
						break
					case 'cinema-watched':
						return "The cinema watched films"
						break
					case 'series':
						return "TV series"
						break
					case 'marvel':
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