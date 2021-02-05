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
		width: auto;
		height: 100%;
	}

	.film__poster img {
		width: auto;
		height: 100%;
	}    
</style>