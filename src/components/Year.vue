<template>
	<div class="page container">
		<h2 class="category-title"> Films from {{year}} year </h2>
		<div class="category-films">
			<div class="category-film" v-for="film in filmsByYear">
				<router-link :to="`/film/${film.id}`" class="category-film__link" :title="film.title">
					<img :src="`images/posters/${film.poster}`" :alt="film.title" class="category-film__poster">
				</router-link>
			</div>
		</div>
		<nav class="year-b-menu">
			<router-link :to="`/years/${prevYear}`" class="year-b-menu__link year-b-menu__link--prev" v-if="+year > 1977"> {{prevYear}} </router-link>
			<router-link to="/years/" class="year-b-menu__link year-b-menu__link--all"> All years </router-link>
			<router-link :to="`/years/${nextYear}`" class="year-b-menu__link year-b-menu__link--next" v-if="+year < currentYear"> {{nextYear}} </router-link>
		</nav>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
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
			},
			prevYear() {
				return +this.year - 1
			},
			nextYear() {
				return +this.year + 1
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style src="stylesElems/year.css"></style>