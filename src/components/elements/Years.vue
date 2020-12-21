<template>
	<div class="home-category component">
		<div class="category">
			<div class="category__header">
				<h2 class="category__title"> Films by years </h2>
			</div>
			<div class="category__body category__body--byYear">
				<div v-for="year in years" class="movie">
					<router-link :to="`/year/${year}/`" class="movie__link">
						<img :src="`images/years/${year}.jpg`" alt="" class="movie__poster">
						<span class="movie__year">{{year}}</span>
					</router-link>
				</div>
				<div class="movie movie--all">
					<router-link to="/film/years/">More years</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'Years',
		computed: {
			...mapState(['films']),
			years() {
				let currentYear = new Date().getFullYear();
				let yearsList = []
				for(let i = 0; i < 5; i++) {
					currentYear--;
					yearsList.push(currentYear);
				}
				return yearsList;
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style src="stylesElems/category-by-years.css"></style>