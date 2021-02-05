<template>
    <div class="film__cast">
        <h2 class="info-section-title">Cast</h2>
        <div class="film__persons">
            <router-link :to="`/actor/${actor.name.toLowerCase().replace(/\s/g, '-')}`" class="actor" v-for="(actor, index) in actors" :key="index">
                <div class="actor__image">
                    <img v-if="actor.image != ''" :src="`https://d2t8nixuow17vt.cloudfront.net/persona/300/${actor.image}`" alt="">
					<img v-else src="images/support/noimage.jpg" alt="Image not found">
                </div>
                <div class="actor__info">
                    <h3 class="actor__names">{{actor.name}}</h3>
                    <p class="actor__role"> {{actor.role}} </p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FilmCast',
        props: ['actors']
    }
</script>

<style>
	.film__cast {
		margin: 20px 0;
	}
	.film__persons {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;
		margin-top: 20px;
	}

	@media (max-width: 800px) {
		.film__persons {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.film__persons .actor {
		display: flex;
		align-items: center;
		background-color: #f7f7f7;
		padding-right: 10px;
		min-height: 90px;
	}

	.film__persons .actor__image {
		font-size: 0;
		flex-shrink: 0;
		margin-right: 20px;
		width: 60px;
	}

	.film__persons .actor__image img {
		width: 100%;
	}

	@media (max-width: 550px) {
		.film__persons {
			display: block;
		}
		.film__persons .actor {
			margin-bottom: 10px;
		}
	}
</style>