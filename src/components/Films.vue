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
		<!-- <Preloader /> -->
		<Search />
		<CategoryFilms :films="displayedFilms" />
		<Pagination :count="pageCount" />
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	
	import Preloader from './parts/Preloader';
	import Search from './parts/Search';
	import CategoryFilms from './parts/CategoryFilms';
	import Pagination from './parts/Pagination'

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
		    	return Math.ceil(this.films.length / this.perPage);
		    }
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		},
		components: {
			Preloader,
			Search,
			CategoryFilms,
			Pagination
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
</style>