<template>
	<div class="category">
		<div class="category__header">
			<h2 class="category__title"> All films </h2>
		</div>
		<div class="category__body">
			<div v-for="(film, index) in films.slice(111, 116)" class="movie">
				<router-link :to="'/film/' + film.id" class="movie__link" :key="index">
					<img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="movie__poster">
				</router-link>
			</div>
			<div class="movie movie--all movie--double">
				<router-link to="/films/1">
					View <br> {{films.length}} films
				</router-link>
				<router-link to="/list">
					List of films
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'AllFilmsCategory',
		computed: {
			...mapState(['films'])
		},
		mounted() {
			this.$store.dispatch('LOAD_FILMS');
		}
	}
</script>