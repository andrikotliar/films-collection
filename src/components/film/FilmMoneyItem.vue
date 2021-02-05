<template>
    <div class="film__money-item" v-if="money != null">
        <div class="film__money-type">{{type}}</div>
        <div class="film__money-value">$ {{money}}</div>
    </div>
</template>

<script>
    export default {
        name: 'FilmMoneyItem',
        props: ['money', 'type']
    }
</script>

<style>
	.film__money-item {
		display: flex;
	}

	.film__money-type {
		font-weight: bold;
		padding: 5px 15px;
		background-color: #d2d2d2;
	}

	.film__money-value {
		padding: 5px 15px;
		background-color: #f2f2f2;
	}
</style>