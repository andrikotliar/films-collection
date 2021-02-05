<template>
    <div class="film__subinfo">
        <FilmCategories :categories="data.categories" />
        <div class="film__money">
            <FilmMoneyItem :money="data.budget" type="Budget" />
            <FilmMoneyItem :money="data.boxoffice" type="Box Office" />
        </div>
    </div>
</template>

<script>
    import FilmCategories from './FilmCategories';
    import FilmMoneyItem from './FilmMoneyItem';

    export default {
        name: 'FilmSubinfo',
        props: ['data'],
        components: {
            FilmCategories,
            FilmMoneyItem
        }
    }
</script>

<style>
	.film__subinfo {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

    .film__money {
		display: flex;
		gap: 15px;
	}
	@media (max-width: 930px) {
		.film__money {
			flex-wrap: wrap;
			justify-content: flex-end;
		}
	}
    @media (max-width: 500px) {
		.film__money {
			justify-content: flex-start;
		}
        .film__subinfo {
			flex-direction: column;
		}
    }
</style>