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

<style src="stylesElems/list.css"></style>