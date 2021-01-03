<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> {{title}} </h2>
		</div>
		<div class="category__body">
			<div v-for="film in reverseFilms.slice(0,5)" class="movie">
				<router-link :to="'/film/' + film.id" class="movie__link">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="movie__poster">
				</router-link>
			</div>
			<div class="movie movie--all">
				<router-link :to="`/${setLink}/${category}/`">
					View <br> {{allFilmsInCategory}}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'HomeCategories',
		props: ['property', 'category', 'title', 'reverse', 'link'],
		computed: {
			...mapState(['films']),
			setCategory() {
				let filmProperty = this.property;
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
			reverseFilms() {
				if(this.reverse != undefined) {
					return this.setCategory.reverse();
				}
				else {
					return this.setCategory;
				}
			},
			setLink() {
				if(this.link != undefined) {
					return this.link
				}
				else {
					return 'categories';
				}
			},
			allFilmsInCategory() {
				if(this.setCategory.length > 6) {
					return `${this.setCategory.length - 5} more`
				} else {
					return 'category'
				}
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>