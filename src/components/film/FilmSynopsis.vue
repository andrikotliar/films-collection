<template>
    <div class="film__synopsis">
        <p>{{synopsis}}</p>
    </div>
</template>

<script>
    export default {
        name: 'FilmSynopsis',
        props: ['synopsis']
    }
</script>

<style>
	.film__synopsis {
		background-color: #000;
		padding: 30px;
		border-bottom: 2px solid #fff;
	}

    .film__synopsis p {
		color: #fff;
		font-size: 20px;
        line-height: 1.5;
    }
</style>