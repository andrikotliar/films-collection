<template>
	<div class="actor-films container">
		<div class="actor-image">
			<img :src="actorPhoto" alt="">
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
			...mapState(['films', 'actors']),
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
				}
				return filteredFilms;
			},
			actorPhoto() {
				let actorName = this.actor.replace(/-/g, ' ');
				let actorData = this.actors.find(actor => actor['gsx$name']['$t'].toLowerCase() === actorName);
				if(actorData != undefined) {
					return actorData.gsx$url.$t;
				}
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_ACTORS');
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style>
	.actor-films {
		display: flex;
		align-items: flex-start;
		margin: 20px 0;
	}
	.actor-image {
		position: relative;
		font-size: 0;
		width: 250px;
		min-height: 250px;
		margin-right: 20px;
		flex-shrink: 0;
	}
	.actor-image:after {
		display: flex;
		align-items: center;
		justify-content: center;
		content: "no image";
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		color: #d2d2d2;
		font-size: 20px;
		font-weight: bold;
		text-transform: uppercase;
		z-index: -1;
		background-color: #f2f2f2;
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
		padding-right: 40px;
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