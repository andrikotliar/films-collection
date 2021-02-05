<template>
	<div class="page container">
		<article class="film" v-if="film != undefined">
			<FilmHeader :data="film" />
			<FilmSubinfo :data="film" />
			<FilmSynopsis :synopsis="film.synopsis" />
			<FilmTrailer :trailer="film.trailer" v-if="film.trailer != null" />
			<SeriesSeasons :type="film.type.data" :poster="film.poster"  v-if="film.type.value != 'film'" />
			<FilmCast :actors="film.actors" />
			<FilmAwards :awards="film.awards"  v-if="film.awards != null" />
			<FilmCharacters :poster="film.poster" :characters="film.characters" v-if="film.characters != undefined" />
			<FilmParts :data="films" :filmID="id" v-if="film.parts != null" />
		</article>		
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	import FilmHeader from './film/FilmHeader';
	import FilmSubinfo from './film/FilmSubinfo';
	import FilmSynopsis from './film/FilmSynopsis';
	import FilmTrailer from './film/FilmTrailer';
	import SeriesSeasons from './film/SeriesSeasons';
	import FilmCast from './film/FilmCast';
	import FilmAwards from './film/FilmAwards';
	import FilmCharacters from './film/FilmCharacters';
	import FilmParts from './film/FilmParts';

	export default {
		names: 'Film',
		props: ['id'],
		computed: {
			...mapState(['films']),
			film() {
				let currentFilm = this.films.find(film => film['id'] === parseInt(this.id));
    			return currentFilm;
			}
		},
		created() {
			this.$store.dispatch('LOAD_FILMS');
		},
		components: {
			FilmHeader,
			FilmSubinfo,
			FilmSynopsis,
			FilmTrailer,
			SeriesSeasons,
			FilmCast,
			FilmAwards,
			FilmCharacters,
			FilmParts
		}
	}
</script>