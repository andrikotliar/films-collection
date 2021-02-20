<template>
	<div class="actor-films container">
		<div class="actor-image">
			<img :src="`https://d2t8nixuow17vt.cloudfront.net/persona${photo}.jpg`" alt="" v-if="photo != ''">
			<img src="images/support/noimage.jpg" alt="" v-else>
		</div>
		<div class="actor-films__wrapper">
			<h2 class="actor-name">{{actor.replace(/-/g, ' ')}}</h2>
			<router-link :to="`/film/${film.id}`" class="actor-film" v-for="(film, index) in actorFilter" :key="index">
				<div class="actor-film__poster">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title">
				</div>
				<div class="actor-film__info">
					<h3 class="actor-film__title">
						{{film.title}} – 
						<span class="actor-film__role">{{film.actors[0].role}}</span>
					</h3>
					<p class="actor-film__synopsis">{{film.synopsis}}</p>
					<p class="actor-film__genres">{{film.genres.join(', ')}}</p>
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
		data() {
			return {
				photo: ''
			}
		},
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
					filteredFilms.push(this.filmsByActor[i]);
					this.photo = filteredFilms[0].actors[0].image;
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
		margin: 20px 0;
	}
	.actor-image {
		width: 250px;
		margin-right: 20px;
		flex-shrink: 0;
	}
	.actor-image img {
		width: 100%;
	}
	.actor-name {
		color: var(--base-color);
		font-size: 30px;
		text-transform: capitalize;
		line-height: 1;
		padding-bottom: 10px;
		border-bottom: 4px solid var(--base-color);
		margin-bottom: 20px;
	}
	.actor-film {
		display: flex;
		margin-bottom: 20px;
		background-color: #f2f2f2;
		transition: .3s;
	}
	.actor-film:hover {
		background-color: #ddd;
	}
	.actor-film__poster {
		font-size: 0;
		width: 100px;
		flex-shrink: 0;
		background-color: #000;
	}
	.actor-film__poster img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: .3s;
	}
	.actor-film:hover .actor-film__poster img {
		opacity: .5;
	}
	.actor-film__info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		padding: 10px 20px;
		width: 100%;
	}
	.actor-film__title {
		font-size: 20px;
	}
	.actor-film__role {
		color: var(--base-color);
	}
	.actor-film__year {
		position: absolute;
		font-weight: bold;
		top: 10px;
		right: 20px;
	}
	.actor-film__genres {
		color: #777;
	}
	@media (max-width: 1200px) {
		.actor-film__year {
			top: inherit;
			bottom: 10px;
		}
	}
	@media (max-width: 780px) {
		.actor-films {
			flex-direction: column;
			justify-content: center;
		}
		.actor-image {
			margin-right: auto;
			margin-left: auto;
			margin-bottom: 20px;
		}
		.actor-name {
			text-align: center;
		}
		.actor-film__poster {
			width: 130px;
		}
		.actor-film__synopsis {
			margin: 10px 0;
		}
	}
	@media (max-width: 500px) {
		.actor-image {
			width: auto;
			height: 250px;
		}
		.actor-image img {
			height: 100%;
			width: auto;
		}
		.actor-film {
			flex-direction: column;
		}
		.actor-film__poster {
			width: 100%;
			height: 200px;
			background-color: #f2f2f2;
			padding-top: 10px;
			padding-left: 20px;
		}
		.actor-film__poster img {
			object-fit: inherit;
			width: auto;
		}
	} 
</style>