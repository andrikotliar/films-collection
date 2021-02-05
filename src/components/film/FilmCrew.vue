<template>
    <div class="crew">
        <div class="crew__position">{{position}}</div>
        <div class="crew__names">{{names}}</div>
    </div>
</template>

<script>
    export default {
        name: 'FilmCrew',
        props: ['position', 'names']
    }
</script>

<style>
	.crew__position {
		font-weight: bold;
		background-color: #d2d2d2;
		padding: 5px 15px;
	}

	.crew__names {
		background-color: #f2f2f2;
		padding: 10px 15px;
	}
</style>