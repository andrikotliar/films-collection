<template>
	<div class="films-list page">
		<h2 class="page-title">The List of Films</h2>
		<div class="films-list__filters">
			<h3 class="films-list__filters-title">Type filter:</h3>
			<div class="films-list__types">
				<div class="films-list__filter" v-for="type in types">
					<input type="radio" class="films-list__filter-radio" :id="type.id" name="type" :value="type.value" v-model="itemsType" :checked="type.checked">
					<label class="films-list__filter-label" :for="type.id">{{type.title}}</label>
				</div>
			</div>
		</div>
		<div v-for="film in filteredList" :class="'films-list__row ' +  film.partstatus + ' films-list__row--' + film.type" :data-watched="film.watched" :data-add="film.appstatus">
			<div class="films-list__title">
				{{film.title}}
			</div>
			<div class="films-list__year">
				{{film.year}}
			</div>
			<div class="films-list__watch-count">
				{{film.watchcount}}
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: 'List',
		data() {
			return {
				types: [
					{
						id: 'allTypes',
						title: 'All types',
						value: 'all',
						checked: 'checked'
					},
					{
						id: 'filmsType',
						title: 'Films',
						value: 'film'
					},
					{
						id: 'seriesType',
						title: 'Series',
						value: 'series'
					},
					{
						id: 'animationType',
						title: 'Animation',
						value: 'animation'
					},
					{
						id: 'animationSeriesType',
						title: 'Animation series',
						value: 'animationSeries'
					},
					{
						id: 'animeType',
						title: 'Anime',
						value: 'anime'
					}
				],
				itemsType: 'all',
				filmsList: []
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_LIST')
		},
		computed: {
			...mapState(['list']),
			filteredList() {
				return this.list.filter((item) => {
					if(this.itemsType === 'all') {
						return this.list;
					}
					else {
						return item.type == this.itemsType;
					}
				})
			}
		}
	}
</script>

<style>
	.films-list {
		max-width: 60%;
	}

	@media screen and (max-width: 960px) {
		.films-list {
			max-width: 80%;
			font-size: 15px;
		}	
	}

	.films-list .page-title {
		margin-bottom: 20px;
	}

	.films-list__filters {
		display: flex;
		margin-bottom: 20px;
	}

	@media (max-width: 780px) {
		.films-list__filters-title {
			margin-bottom: 20px;
		}
		.films-list__filters {
			flex-direction: column;
		}
	}

	.films-list__filters-title {
		flex-shrink: 0;
	}

	.films-list__types {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		font-size: 1.1rem;
		margin-left: 20px;
	}

	@media (max-width: 780px) {
		.films-list__types {
			margin-left: 0;
		}
	}

	.films-list__filter-radio {
		display: none;
	}

	.films-list__filter-label {
		display: block;
		background-color: #f2f2f2;
		padding: 10px 20px; 
		text-transform: uppercase;
		border-radius: 2px;
		cursor: pointer;
		transition: .3s;
	}

	.films-list__filter-radio:checked + .films-list__filter-label {
		background-color: #ddd;
		box-shadow: 0 0 0 2px var(--base-color);
	}

	.films-list__filter-label:hover {
		background-color: #ddd;
	}

	.films-list__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fbfbfb;
		border: 2px solid #ddd;
		padding: 16px 20px;
		position: relative;		
	}
	.films-list__row[data-watched="0"] {
		background-color: #ff6666;
	}
	.films-list__row[data-add="0"] .films-list__title {
		color: red;
	}

	.films-list__row--film {
		border-color: var(--base-color);
	}

	.films-list__row--animation {
		border-color: #f57f17;
	}

	.films-list__row--series {
		border-color: #38006b;
	}

	.films-list__row--animationSeries {
		border-color: #ffa726;
	}

	.films-list__row--anime {
		border-color: #e65100;
	}

	.films-list__title {
		width: 70%;
	}
	.films-list__year {
		width: 20%;
		text-align: center;
	}
	.films-list__watch-count {
		color: #fff;
		width: 10%;
		text-align: center;
		background-color: #ddd;
		border-radius: 5px;
		padding: 5px 0;
	}
	.films-list__row--film .films-list__watch-count {
		background-color: var(--base-color);
	} 

	.films-list__row--animation .films-list__watch-count {
		background-color: #f57f17;
	}

	.films-list__row--series .films-list__watch-count {
		background-color: #38006b;
	}

	.films-list__row--animationSeries .films-list__watch-count {
		background-color: #ffa726;
	}

	.films-list__row--anime .films-list__watch-count {
		background-color: #e65100;
	}

	.films-list .single_part {
		border-radius: 5px;
		margin-bottom: 15px;
	}

	.films-list .first_part {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		border-bottom: 0;
	}

	.films-list .middle_part {
		border-top: 1px solid #ddd;
		border-radius: 0;
		border-bottom: 0;
	}

	.films-list .last_part {
		border-top: 1px solid #ddd;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		margin-bottom: 15px;
	}
</style>