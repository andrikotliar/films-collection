<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> Films by year </h2>
		</div>
		<div class="category__years">
			<router-link :to="`/year/${year}`" class="category__year" v-for="(year, index) in years.slice(0, yearsToShow)" :key="index">
				{{year}}
			</router-link>
		</div>
		<YearsSelect disabledText="Select early years" :yearsToShow="yearsToShow" className="select-wrapper--homeYears" />
	</div>

</template>

<script>
	import YearsSelect from './../parts/YearsSelect';
	export default {
		name: 'YearsCategory',
		data() {
			return {
				yearsToShow: 12
			}
		},
		computed: {
			years() {
				let currentYear = new Date().getFullYear();
				let yearsList = []
				for(let i = 0; i < 12; i++) {
					currentYear--;
					yearsList.push(currentYear);
				}
				return yearsList;
			}
		},
		components: {
			YearsSelect
		}
	}
</script>

<style>
	.category__years {
		--columns: 6;
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-gap: 10px;
	}
	@media (max-width: 1300px) {
		.category__years {
			--columns: 4;
		}
	}
	@media (max-width: 720px) {
		.category__years {
			--columns: 3;
		}
	}
	.category__year {
		position: relative;
		color: #fff;
		font-weight: bold;
		padding: 10px;
		text-align: center;
		background-color: var(--base-color);
		transition: .3s;
	}
	.category__year:before,
	.category__year:after {
		position: absolute;
		width: 10px;
		height: 10px;
		transition: .3s;
		content: '';		
	}
	.category__year:before {
		bottom: -2px;
		right: -2px;
		border-right: 2px solid #fff;
		border-bottom: 2px solid #fff;
	}
	.category__year:after {
		top: -2px;
		left: -2px;
		border-left: 2px solid #fff;
		border-top: 2px solid #fff;
	}
	.category__year:hover:before,
	.category__year:hover:after {
		width: calc(100% - 10px);
		height: calc(100% - 10px);		
	}
	.category__year:hover:before { 
		bottom: 5px;
		right: 5px;		
	}
	.category__year:hover:after {
		top: 5px;
		left: 5px;		
	}
	.select-wrapper--homeYears {
		margin-top: 20px;
		width: min(400px, 100%);
	}
</style>