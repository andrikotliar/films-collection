<template>
    <div class="film__cast">
        <h2 class="info-section-title">Cast</h2>
        <div class="film__persons">
            <router-link :to="`/actor/${actor.name.toLowerCase().replace(/\s/g, '-')}`" class="actor" v-for="(actor, index) in updatedActorsList" :key="index">
                <div class="actor__image">
                    <img :src="actor.image" alt="">
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
	import {mapState} from 'vuex';
    export default {
        name: 'FilmCast',
        props: ['actorsList'],
		computed: {
			...mapState(['actors']),
			updatedActorsList() {
				let newArr = []
				for(let i = 0; i < this.actorsList.length; i++) {
					let currentActor = this.actors.find(actor => actor['gsx$name']['$t'] === this.actorsList[i].name);
					if(currentActor != undefined) {
						this.actorsList[i].image = currentActor.gsx$url.$t;
						newArr.push(this.actorsList[i]);
					}
				}
				return newArr;
			}
		},
		created() {
			this.$store.dispatch('LOAD_ACTORS');
		}
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