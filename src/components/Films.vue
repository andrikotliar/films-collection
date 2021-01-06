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
		<Preloader />
		<div class="category-films">
			<router-link :to="'/film/' + film.id" v-for="(film, index) in displayedFilms" class="category-film" :key="index">
				<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="category-film__poster" :title="film.title">
			</router-link>			
		</div>
		<div class="pagination">
			<div class="pages">
				<router-link :to="'/films/' + pageNum" v-for="pageNum in pageCount" class="page-num" :key="pageNum"> {{pageNum}} </router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import Preloader from 'elements/Preloader.vue'
	export default {
		name: 'Home',
		props: ['page'],
		data() {
			return {
				perPage: 24
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
		},
		components: {
			Preloader
		}
	}
</script>

<style src="stylesElems/all-films.css"></style>