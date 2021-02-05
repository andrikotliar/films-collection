<template>
    <div class="film__basic">
        <div class="film__year">
            <router-link :to="`/years/${year}`">{{year}}</router-link>
        </div>
        <div class="film__genres">
            <router-link v-for="(genre, index) in genres" :to="'/genres/' + genre" :key="index" class="film__genre">{{genre}}</router-link>
        </div>
        <div class="film__runtime">
            {{time}} min
        </div>
        <div class="film__country">
            <router-link :to="`/country/${country}`">
                {{country}}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FilmBasic',
        props: ['year', 'genres', 'time', 'country']
    }
</script>

<style>
	.film__basic {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.film__year {
		color: #fff;
		background-color: var(--base-color);
		padding: 5px 15px;
	}

	.film__genres {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.film__genre {
		display: block;
		padding: 5px 15px;
		background-color: #ffe6b3;
		transition: .3s;
		font-size: 14px;
	}
	.film__genre:hover {
		background-color: #ffdd99;
	}

	.film__runtime, .film__country {
		padding: 5px 15px;
		background-color: #f2f2f2;
	}
</style>