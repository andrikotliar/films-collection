<template>
    <div class="film__header">
        <FilmPoster :poster="data.poster" :title="data.title" />
        <div class="film__info">
            <h1 class="film__title"> {{data.title}} </h1>
            <FilmBasic :year="data.year" :genres="data.genres" :time="data.time" :country="data.country" />
            <div class="film__crew film__crew--director">
                <FilmCrew position="Directed by" :names="data.director" v-if="data.type.value === 'film' " />
                <FilmCrew position="Creators" :names="data.director" v-else />
            </div>
            <div class="film__crew">
                <FilmCrew position="Produced by" :names="data.producers" />
                <FilmCrew position="Writtens by" :names="data.writtens" />
                <FilmCrew position="Music by" :names="data.music" />
                <FilmCrew position="Cinematography by" :names="data.cinema" v-if="data.cinema != null" />
            </div>
            <FilmProduction :studios="data.production" />
        </div>
    </div>
</template>
<script>
   
    import FilmPoster from './FilmPoster';
	import FilmBasic from './FilmBasic';
	import FilmCrew from './FilmCrew';
    import FilmProduction from './FilmProduction';
    
    export default {
        name: 'FilmHeader',
        props: ['data'],
        components: {
            FilmPoster,
			FilmBasic,
			FilmCrew,
            FilmProduction
		}
    }
</script>

<style>
	.film__title {
		color: var(--base-color);
		font-size: 2.5rem;
	}

	.film__header {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
		height: 500px;
	}

	@media (max-width: 680px) {
		.film__header {
			height: 350px;
		}
	}
	
	.film__info {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: auto;
		border-bottom: 4px solid #f2f2f2;
		padding-right: 20px;
		padding-bottom: 20px;
	}

	@media(max-width: 500px) {
		.film__header {
			height: auto;
			flex-direction: column;
		}
		.film__poster {
			width: 100%;
		}
		.film__poster img {
			width: 100%;
		}
		.film__info {
			padding-right: 0;
		}
	}
	.film__crew {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.film__crew--director {
		margin-bottom: 0;
	}
</style>