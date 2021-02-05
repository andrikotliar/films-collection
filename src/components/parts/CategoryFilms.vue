<template>
    <div class="category-films">
        <router-link :to="'/film/' + film.id" v-for="(film, index) in films" class="category-film" :key="index">
            <img :src="`images/posters/${film.poster}.webp`" :alt="film.title" class="category-film__poster" :title="film.title">
        </router-link>			
    </div>
</template>
<script>
    export default {
        name: 'CategoryFilms',
        props: ['films']
    }
</script>
<style>
	.category-films {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 15px;
	}

	@media (max-width: 550px) {
		.category-films {
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		}
	}

	.category-film {
		display: block;
		width: 100%;
		min-height: 200px;
		height: 100%;
		transition: .3s;
		background-color: #eee;
	}

	.category-film:hover {
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}

	.category-film__poster {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>