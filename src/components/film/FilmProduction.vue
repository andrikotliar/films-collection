<template>
    <div class="film__production">
        <span class="film__production-title">Production Co.:</span>
        <div class="film__studio" v-for="(studio, index) in studios" :key="index">
            <router-link :to="`/production/${studio}`">{{studio.replace(/\-/g, ' ')}}</router-link><span v-if="studios.length > 1 && index + 1 != studios.length">,</span>
        </div>
    </div> 
</template>

<script>
    export default {
        name: 'FilmProduction',
        props: ['studios']
    }
</script>

<style>
	.film__production {
		display: flex;
		flex-wrap: wrap;
		margin-top: auto;
		height: auto;
	}

	.film__production-title {
		padding-right: 10px;
	}

	.film__studio {
		text-decoration: underline;
	}

	.film__studio span {
		padding-right: 5px;
	}
</style>