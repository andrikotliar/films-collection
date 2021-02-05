<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> Films by years </h2>
		</div>
		<div class="category__body category__body--byYear">
			<router-link :to="`/years/${year}`" class="category__year" v-for="(year, index) in years" :key="index">
				{{year}}
			</router-link>
			<router-link to="/years/" class="category__year category__year--more">
				More
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'YearsCategory',
		computed: {
			years() {
				let currentYear = new Date().getFullYear();
				let yearsList = []
				for(let i = 0; i < 11; i++) {
					currentYear--;
					yearsList.push(currentYear);
				}
				return yearsList;
			}
		}
	}
</script>

<style>
	.category__body--byYear {
		flex-wrap: wrap;
		gap: 10px;
	}
	.category__year {
		color: var(--base-color);
		font-weight: bold;
		padding: 10px;
		width: 160px;
		text-align: center;
		border: 4px solid var(--base-color);
		transition: .3s;
	}
	@media (max-width: 750px) {
		.category__year {
			width: 200px;
		}
	}
	@media (max-width: 700px) {
		.category__year {
			width: calc(50% - 10px);
		}
	}
	@media (max-width: 420px) {
		.category__year {
			width: 100%;
		}
		.category__year:nth-child(n+6):not(.category__year--more) {
			display: none;
		}
	}
	.category__year:hover {
		color: #fff;
		background-color: var(--base-color);
	}

	.category__year--more {
		color: #000;
		background-color: #eee;
		border-color: #eee;
	}
	.category__year--more:hover {
		color: #000;
		background-color: #ddd;
		border-color: #ddd;
	}
</style>