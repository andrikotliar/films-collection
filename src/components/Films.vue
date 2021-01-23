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
		<Search />
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
	import Preloader from './parts/Preloader.vue';
	import Search from './parts/Search.vue';
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
			reversedFilms() {
				return this.films.reverse();
			},
			displayedFilms() {
		       return this.paginate(this.reversedFilms);
		    },
		    pageCount() {
		    	return Math.ceil(this.films.length / this.perPage)
		    }
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		},
		components: {
			Preloader,
			Search
		}
	}
</script>

<style>
	.all-films {
		--main-color: #006db7;
		min-height: 900px;
	}

	.all-films__top {
		display: flex;
		justify-content: space-between;
		font-size: 15px;
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.all-films__top b {
		font-weight: bold;
		font-size: 18px;
		padding-left: 10px;
	}
	.pagination {
		margin: 15px 0 30px;
		width: 100%;
	}
	.pages {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.page-num {
		font-family: Arial, sans-serif;
		font-size: 14px;
		font-weight: bold;
		width: 40px;
		height: 30px;
		text-align: center;
		color: var(--main-color);
		border: 1px solid var(--main-color);
		border-right: 0;
		background: none;
		outline: none;
		transition: .3s;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		position: relative;
		transition: .3s;
	}
	.page-num:after {
		content: '';
		position: absolute;
		top: -3px;
		left: -3px;
		width: 100%;
		height: 100%;
		border: 3px solid var(--main-color);
		visibility: hidden;
		opacity: 0;
		transition: .3s;
	}
	.page-num:last-child {
		border: 1px solid var(--main-color);
	}

	.page-num:hover {
		background-color: var(--main-color);
		color: #fff;
	}

	.page-num:hover:after {
		visibility: visible;
		opacity: 1;
	}

	.pages .router-link-active {
		background-color: var(--main-color);
		color: #fff;	
	}

	.pages .router-link-active:after {
		visibility: visible;
		opacity: 1;
	}
</style>