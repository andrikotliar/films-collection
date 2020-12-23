<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> Films by years </h2>
		</div>
		<div class="category__body category__body--byYear">
			<div v-for="year in years" class="movie">
				<router-link :to="`/years/${year}`" class="movie__link">
					<img :src="`images/years/${year}.webp`" alt="" class="movie__poster">
					<span class="movie__year">{{year}}</span>
				</router-link>
			</div>
			<div class="movie movie--all">
				<router-link to="/years/">More years</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Years',
		computed: {
			years() {
				let currentYear = new Date().getFullYear();
				let yearsList = []
				for(let i = 0; i < 5; i++) {
					currentYear--;
					yearsList.push(currentYear);
				}
				return yearsList;
			}
		}
	}
</script>

<style src="stylesElems/category-by-years.css"></style>