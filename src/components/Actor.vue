<template>
	<div class="actor-films page container">
		<aside class="actor-info">
			<div class="actor-info__image">
				<img :src="`images/actors/${actor}.jpg`" alt="">
			</div>
			<h2 class="actor-info__name">
				
			</h2>
		</aside>
		<div class="actor-films-list">
			<h2 v-for="film in filmsByActor">{{film.title}}</h2>
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
				return actorFilms;
			}
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>

<style src="stylesElems/actor.css"></style>