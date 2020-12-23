<template>
	<div class="container page">
		<div class="years-list">
			<div class="film-year" v-for="year in yearsList">
				<router-link :to="`/years/${year}`">
					<img :src="`images/years/${year}.webp`" :alt="year">
					<h3 class="film-year__title">{{year}}</h3>					
				</router-link>
			</div>				
		</div>
	</div>
</template>

<script>
	export default {
		name: 'YearsList',
		data() {
			return {
				startYear: 1977,
				currentYear: new Date().getFullYear()
			}
		},
		computed: {
			yearsList() {
				let years = [];
				let filteredYears;
				let emptyYears = [1978, 1979, 1981, 1982, 1986, 1987, 1988, 1993];
				for(let i = this.startYear; i < this.currentYear; i++) {
					years.push(i);
				}
				filteredYears = years.filter((year) => !emptyYears.includes(year))
				return filteredYears;	
			}
		}
	}
</script>

<style src="stylesElems/years-list.css"></style>