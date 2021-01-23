<template>
	<div class="container page">
		<div class="years-list">
			<router-link :to="`/years/${year}`" class="film-year" v-for="(year, index) in yearsList" :key="index">
				<img :src="`images/years/${year}.webp`" :alt="year">
				<h3 class="film-year__title">{{year}}</h3>					
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
	}

	.film-year {
		display: block;
		height: 215px;
		overflow: hidden;
		background-color: #f2f2f2;
		position: relative;
	}

	.film-year img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.film-year__title {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		color: #fff;
		font-size: 30px;
		text-align: center;
		line-height: 215px;
	}
</style>