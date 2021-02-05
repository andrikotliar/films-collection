<template>
    <div class="film__categories">
        <router-link v-for="(category, index) in categories" :to="'/categories/' + category" :key="index" :class="'film__category film__category--' + category"> {{category.replace(replaceRule, ' ')}} </router-link>
    </div>
</template>

<script>
    export default {
        name: 'FilmCategories',
        props: ['categories'],
        computed: {
            replaceRule() {
                return new RegExp(/[^a-zA-Z\d]/g);
            }
        }
    }
</script>

<style>
	.film__categories {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
	}
	@media (max-width: 500px) {
		.film__categories {
			margin-bottom: 10px;
		}
	}

	.film__category {
		display: block;
		background-color: #ccc;
		padding: 5px 15px;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: bold;
	}

	.film__category--special-favorite {
		background-color: #fdd835;
	}
	.film__category--dceu {
		background-color: #4a148c;
		color: #fff;			
	}
	.film__category--marvel {
		background-color: #d32f2f;
		color: #fff;
	}
	.film__category--star-wars {
		background-color: #ffee58;
	}
	.film__category--harry-potter {
		background-color: #ffb74d;
	}
	.film__category--cinema-watched {
		background-color: #64b5f6;
		color: #fff;
	}
	.film__category--most-watched {
		background-color: #1de9b6;
	}
	.film__category--series {
		background-color: #90a4ae;
		color: #fff;
	}
</style>