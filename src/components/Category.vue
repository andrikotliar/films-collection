<template>
	<section id="categories" class="page">
		<section class="category-list">
			<div class="container">
				<div v-for="film in filteredFilms" class="category-film">
					<router-link :to="'/film/' + film.id" class="category-film__link">
						<img :src="`images/posters/${film.poster}.jpg`" :alt="film.title" class="category-film__poster">
					</router-link>
				</div>
				<div class="not-found" v-if="error">
					Films not found
				</div>
				<div class="load-more" v-if="loadMore">
					<button @click="loadMoreBtn" class="load-more__btn">Load more</button>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: 'Category',
		props: ['category'],
		data() {
			return {
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
					return movies.slice(0, this.slice);
				} else {
					this.error = true;
				}
			}
		},
		created() {
			document.documentElement.scrollTop = 0;
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style src="stylesElems/category.css"></style>