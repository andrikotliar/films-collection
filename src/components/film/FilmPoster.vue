<template>
    <div class="film__poster">
        <img :src="posterImage" :alt="title">
    </div>
</template>

<script>
    export default {
        name: 'FilmPoster',
        props: ['poster', 'title'],
        data() {
            return {
                folder: 'images/posters/',
                format: '.webp'
            }
        },
        computed: {
            posterImage() {
                return this.folder + this.poster + this.format;
            }
        }
    }
</script>

<style>
	.film__poster {
		width: 500px;
		height: auto;
        font-size: 0;
	}

	.film__poster img {
		width: 100%;
        height: auto;
	}    
    @media (max-width: 850px) {
        .film__poster {
            width: 400px; 
        }
    }
</style>