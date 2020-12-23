<template>
	<div class="all-films container">
		<div class="all-films__top">
			<div class="current-page">
				Page <b> {{page}} </b> / {{pageCount}}
			</div>
			<div class="total">
				Number of films: <b>{{films.length}}</b>
			</div>			
		</div>
		<div class="all-films__list">
			<div v-for="film in displayedFilms" class="all-films__item">
				<router-link :to="'/film/' + film.id" class="all-films__item-link">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="all-films__item-poster" :title="film.title">
				</router-link>
			</div>				
		</div>
		<div class="pagination">
			<div class="pages">
				<router-link :to="'/all_films/' + pageNum" v-for="pageNum in pageCount" class="page-num" :key="pageNum"> {{pageNum}} </router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'Home',
		props: ['page'],
		data() {
			return {
				perPage: 28
			}
		},
		methods: {
			paginate (films) {
				let page = this.page;
				let perPage = this.perPage;
				let from = (page * perPage) - perPage;
				let to = (page * perPage);
				document.documentElement.scrollTop = 0;				
				return films.slice(from, to);
			}
		},
		computed: {
			...mapState(['films']),
			displayedFilms() {
		       return this.paginate(this.films);
		    },
		    pageCount() {
		    	return Math.ceil(this.films.length / this.perPage)
		    }
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style src="stylesElems/all-films.css"></style>