<template>
	<div :class="`select-wrapper ${className}`">
		<select class="select" v-model="selectedYear" @change="chooseYear">
			<option disabled value="">{{disabledText}}</option>
			<option v-for="(year, index) in years.slice(yearsToShow)" :key="index" v-if="year != +exeption">
				{{year}}
			</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: 'YearSelect',
		props: ['disabledText', 'yearsToShow', 'className', 'exeption'],
		data() {
			return {
				selectedYear: ''
			}
		},
		methods: {
			chooseYear() {
				if(!location.href.includes('year')) {
					this.$router.push({path: '/year/' + this.selectedYear })
				}
				else {
					this.$router.push({path: this.selectedYear }).catch(err => {})
				}
			},
		},
		computed: {
			years() {
				let years = [];
				let startYear = 1977;
				let currentYear = new Date().getFullYear();
				let filteredYears;
				let emptyYears = [1978, 1979, 1981, 1982, 1986, 1987, 1988];
				for(let i = startYear; i < currentYear; i++) {
					years.push(i);
				}
				filteredYears = years.filter((year) => !emptyYears.includes(year))
				return filteredYears.reverse();	
			}
		}
	}
</script>

<style>
	.select-wrapper {
		position: relative;
		color: var(--base-color);
		width: 100%;
		margin: auto;
		transition: .3s;
	}
	.select-wrapper:hover,
	.select-wrapper:focus {
		color: #fff;
		background-color: var(--base-color);
	}
	.select-wrapper:after {
		position: absolute;
		right: 10px;
		top: 18px;
		border: 8px solid transparent;
		border-top: 10px solid var(--base-color);
		content: '';
		transition: .3s;
	}
	.select-wrapper:hover:after,
	.select-wrapper:focus:after {
		border-top-color: #fff;
	}
	.select {
		display: block;
		width: 100%;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		color: inherit;
		font-size: 18px;
		font-family: inherit;
		font-weight: bold;
		cursor: pointer;
		padding: 10px 20px;
		border: 2px solid var(--base-color);
		outline: none;
		background: transparent;
		transition: .3s;
	}
	.select option {
		color: #000;
	}	
</style>