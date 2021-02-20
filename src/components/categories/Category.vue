<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> {{title}} </h2>
		</div>
		<div class="category__body">
			<div v-for="(film, index) in reverseFilms.slice(0,5)" class="movie" :key="index">
				<router-link :to="'/film/' + film.id" class="movie__link">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="movie__poster">
				</router-link>
			</div>
			<div class="movie movie--all">
				<router-link :to="`/${setLink}/${category}/`">
					View <br> {{allFilmsInCategory}}
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex';

	export default {
		name: 'Category',
		props: ['property', 'category', 'title', 'reverse', 'link'],
		computed: {
			...mapState(['films']),
			setCategory() {
				let filmProperty = this.property;
				let filmCategory = this.category;
				let filteredFilms;
				if(/^[0-9]+$/.test(this.category)) {
					filteredFilms = this.films.filter(film => film[filmProperty] == filmCategory);
				}
				else {
					filteredFilms = this.films.filter(film => film[filmProperty].includes(filmCategory));
				}
				return filteredFilms;
				
			},
			reverseFilms() {
				if(this.reverse != undefined) {
					return this.setCategory.reverse();
				}
				else {
					return this.setCategory;
				}
			},
			setLink() {
				if(this.link != undefined) {
					return this.link
				}
				else {
					return 'categories';
				}
			},
			allFilmsInCategory() {
				if(this.setCategory.length > 6) {
					return `${this.setCategory.length - 5} more`
				} else {
					return 'category'
				}
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>
<style>
	.category {
		width: 100%;
		margin-bottom: 40px;
	}
	.category__header {
		color: #fff;
		padding: 8px 20px;
		background-color: #008bea;
		margin-bottom: 15px;
		border-left: 10px solid #006db7;
	}
	.category__title {
		font-size: 18px;
		font-weight: 100;
	}
	.category__body {
		display: flex;
		justify-content: space-between;
	}
	.category__body--withCaption .movie {
		position: relative;
	}
	.category__body--withCaption .movie__year {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color: #fff;
		font-size: 2rem;
		font-weight: bold;
		background-color: rgba(0,0,0,.6);
	}
	@media (max-width: 1300px) {
		.category__body {
			overflow: auto;
		}
	}
	.movie {
		transition: .3s;
		position: relative;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		width: 160px;
		height: 230px;
		background-color: #eee;
	}
	.movie:hover {
		box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
	}
	@media (max-width: 1300px) {
		.movie {
			margin-right: 20px;
			flex-shrink: 0;
		}
	}

	@media (max-width: 1040px) {
		.movie {
			width: 140px;
			height: 210px;
		}
	}
	.movie__link img {
		width: 100%;
		height: 100%;
		display: block;
	}
	.movie--all:hover {
		box-shadow: none;
		background-color: #d0d0d0;		
	}
	.movie--list {
		color: #fff;
		background-color: var(--base-color);
	}
	.movie--list:hover {
		background-color: #008bea;
	}
	.movie a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		font-size: 18px;
		text-align: center;
	}
</style>