<template>
	<div class="actor-films container">
		<aside class="actor-info">
			<div class="actor-info__image">
				<img :src="`images/actors/${actor}.jpg`" alt="">
			</div>
			<h2 class="actor-info__name">
				{{actor.replace(/-/g, ' ')}}
			</h2>
		</aside>
		<div class="actor-films__list">
			<router-link :to="`/film/${film.id}`" class="actor-film" v-for="(film, index) in actorFilter" :key="index">
				<div class="actor-film__poster">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title">
				</div>
				<div class="actor-film__info">
					<p class="actor-film__role">
						{{film.actors[0].role}}
					</p>
					<p class="actor-film__year">{{film.year}}</p>							
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'Actor',
		props: ['actor'],
		computed: {
			...mapState(['films']),
			filmsByActor() {
				let actorFilms = [];
				let actor = this.actor.replace(/-/g, ' ')
				for(let i = 0; i < this.films.length; i++) {
					for(let j in this.films[i].actors) {
						if(this.films[i].actors[j].name.toLowerCase() === actor) {
							actorFilms.push(this.films[i]);
						}
					}
				}
				return actorFilms.sort((a, b) => a.year > b.year ? 1 : -1).reverse();
			},
			actorFilter() {
				let filteredFilms = [];
				let actor = this.actor.replace(/-/g, ' ');
				for(let i = 0; i < this.filmsByActor.length; i++) {
					this.filmsByActor[i].actors = this.filmsByActor[i].actors.filter(item => item.name.toLowerCase() === actor);
					filteredFilms.push(this.filmsByActor[i])
				}
				return filteredFilms;
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style>
	.actor-films {
		display: flex;
		align-items: flex-start;
		gap: 40px;
		padding-top: 40px;
		padding-bottom: 40px;
	}
	.actor-info {
		width: 200px;
	}
	.actor-info__image {
		font-size: 0;
	}
	.actor-info__name {
		color: #fff;
		text-transform: capitalize;
		text-align: center;
		background-color: var(--base-color);
		padding: 10px;
	}
	.actor-films__list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	.actor-film {
		width: 150px;
		text-align: center;
	}
	.actor-film__poster {
		width: 100%;
		height: 210px;
		background-color: #000;
	}
	@media (max-width: 680px) {
		.actor-films__list {
			flex-wrap: nowrap;
			overflow-x: auto;
		}
		.actor-film {
			width: 190px;
			flex-shrink: 0;
		}
		.actor-film__poster {
			height: 280px;
		}
	}
	@media (max-width: 520px) {
		.actor-films {
			overflow: auto;
			margin-right: 5%;
		}
		.actor-films__list {
			overflow-x: initial;
		}
	}
	.actor-film__poster img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: .3s;
	}
	.actor-film__info {
		background-color: #f2f2f2;
		padding: 10px;
		position: relative;
		transition: .3s;
	}
	.actor-film__info:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: var(--base-color);
		z-index: -1;
		transition: .4s;
	}
	.actor-film__role {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 5px;
	}
	.actor-film:hover .actor-film__poster img {
		opacity: .6;
	}
	.actor-film:hover .actor-film__info {
		color: #fff;
		background: transparent;
	}
	.actor-film:hover .actor-film__info:after {
		height: 100%;
	}	
</style>