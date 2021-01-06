<template>
	<div class="actor-films container">
		<aside class="actor-info">
			<div class="actor-info__image">
				<img :src="`images/actors/${actor}.jpg`" alt="">
			</div>
			<h2 class="actor-info__name">
				{{actor.replace(/_/g, ' ')}}
			</h2>
		</aside>
		<div class="actor-films__list">
			<router-link :to="`/film/${film.id}`" class="actor-film" v-for="(film, index) in filmsByActor" :key="index">
				<div class="actor-film__poster">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title">
				</div>
				<div class="actor-film__info">
					<p class="actor-film__role" v-for="a in film.actors" v-if="a.image == actor">
						{{a.role}}
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
				for(let i = 0; i < this.films.length; i++) {
					for(let j in this.films[i].actors) {
						if(this.films[i].actors[j].image == this.actor) {
							actorFilms.push(this.films[i]);
						}
					}
				}
				return actorFilms.sort((a, b) => a.year > b.year ? 1 : -1).reverse();
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style src="stylesElems/actor.css"></style>