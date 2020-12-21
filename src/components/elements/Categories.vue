<template>
	<div class="home-category component">
		<div class="category">
			<div class="category__header">
				<h2 class="category__title"> {{title}} </h2>
			</div>
			<div class="category__body">
				<div v-for="film in setCategory.slice(0,5)" class="movie">
					<router-link :to="'/film/' + film.id" class="movie__link">
						<img :src="`images/posters/${film.poster}.jpg`" :alt="film.title" class="movie__poster">
					</router-link>
				</div>
				<div class="movie movie--all">
					<router-link :to="`/category/${category}/`">
						View <br> {{allFilmsInCategory}}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'HomeCategories',
		props: ['category', 'title', 'reverse', 'className'],
		computed: {
			...mapState(['films']),
			setCategory() {
				let condition = this.category
				if(this.reverse == 'true') {
					return this.films.filter(n => Object.values(n).some(m => JSON.stringify(m).includes(condition))).reverse();
				} else {
					return this.films.filter(n => Object.values(n).some(m => JSON.stringify(m).includes(condition)));
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