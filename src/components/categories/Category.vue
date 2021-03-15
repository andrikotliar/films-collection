<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> 
				<router-link :to="`/${setLink}/${category}/`">{{title}}</router-link>
			</h2>
			<div class="category__count">{{setCategory.length}} films</div>
		</div>
		<div class="category__body">
			<div v-for="(film, index) in reverseFilms.slice(0,6)" class="movie" :key="index">
				<router-link :to="'/film/' + film.id" class="movie__link">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="movie__poster">
				</router-link>
			</div>
		</div>
		<router-link :to="`/${setLink}/${category}`" class="category__btn">View category</router-link>
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
		padding-bottom: 20px;
		margin-bottom: 20px;
		border-bottom: 2px solid #d2d2d2;
	}
	.category:last-child {
		border-bottom: 0;
	}
	.category__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--base-color);
		margin-bottom: 15px;
	}
	.category__title {
		font-size: 30px;
		font-weight: bold;
		line-height: 1;
	}
	.category__count {
		font-size: 18px;
	}
	@media (max-width: 450px) {
		.category__header {
			flex-direction: column;
			align-items: flex-start;
		}
		.category__title {
			font-size: 20px;
		}
		.category__count {
			font-size: 14px;
		}
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
	.category__btn {
		display: block;
		width: 200px; 
		color: var(--base-color);
		font-weight: bold;
		text-align: center;
		margin: 20px auto 0;
		padding: 10px 20px;
		border: 3px solid var(--base-color);
		margin-top: 20px;
		transition: .3s;
	}
	.category__btn:hover {
		color: #fff;
		background-color: var(--base-color);
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