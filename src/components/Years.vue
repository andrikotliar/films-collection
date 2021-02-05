<template>
	<div class="container page">
		<h2 class="page-title">Films by years</h2>
		<div class="years-list">
			<router-link :to="`/years/${year}`" class="film-year" v-for="(year, index) in yearsList" :key="index">
				{{year}}				
			</router-link>			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Years',
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
				let emptyYears = [1978, 1979, 1981, 1982, 1986, 1987, 1988];
				for(let i = this.startYear; i < this.currentYear; i++) {
					years.push(i);
				}
				filteredYears = years.filter((year) => !emptyYears.includes(year))
				return filteredYears.reverse();	
			}
		}
	}
</script>

<style>
	.years-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 15px;
		margin-top: 20px;
	}

	.film-year {
		display: block;
		padding: 10px;
		text-align: center;
		position: relative;
		color: var(--base-color);
		font-weight: bold;
		border: 4px solid var(--base-color);
		transition: .3s;
	}

	.film-year:hover {
		background: var(--base-color);
		color: #fff;
	}
</style>