<template>
	<div class="page container">
		<article class="film" v-if="films[filmID] != undefined">
			<div class="film__header">
				<div class="film__poster">
					<img :src="`images/posters/${films[filmID].poster}.webp`" :alt="films[filmID].title">
				</div>
				<div class="film__info">
					<h1 class="film__title"> {{films[filmID].title}} </h1>
					<div class="film__basic">
						<div class="film__year">
							<router-link :to="`/years/${films[filmID].year}`">{{films[filmID].year}}</router-link>
						</div>
						<div class="film__genres">
							<router-link v-for="(genre, index) in films[filmID].genres" :to="'/genres/' + genre" :key="index" class="film__genre">{{genre}}</router-link>
						</div>
						<div class="film__runtime">
							{{films[filmID].time}} min
						</div>
						<div class="film__country">
							<router-link :to="`/country/${films[filmID].country}`">
								{{films[filmID].country}}
							</router-link>
						</div>
					</div>
					<div class="film__crew film__crew--director">
						<div class="crew">
							<div class="crew__position" v-if="films[filmID].type.value === 'film' ">Directed by</div>
							<div class="crew__position" v-else>Creators</div>
							<div class="crew__names">{{films[filmID].director}}</div>
						</div>
					</div>
					<div class="film__crew">
						<div class="crew">
							<div class="crew__position">Produced by</div>
							<div class="crew__names">{{films[filmID].producers}}</div>
						</div>
						<div class="crew">
							<div class="crew__position">Writtens by</div>
							<div class="crew__names">{{films[filmID].writtens}}</div>
						</div>
						<div class="crew">
							<div class="crew__position">Music by</div>
							<div class="crew__names">{{films[filmID].writtens}}</div>
						</div>
						<div class="crew" v-if="films[filmID].cinema != null">
							<div class="crew__position">Cinematography by</div>
							<div class="crew__names">{{films[filmID].cinema}}</div>
						</div>
					</div>
					<div class="film__production">
						<span class="film__production-title">Production Co.:</span>
						<div class="film__studio" v-for="(studio, index) in films[filmID].production" :key="index">
							<router-link :to="`/production/${studio}`">{{studio.replace(/\-/g, ' ')}}</router-link><span v-if="films[filmID].production.length > 1 && index + 1 != films[filmID].production.length">,</span>
						</div>
					</div> 
				</div>
			</div>
			<div class="film__subinfo">
				<div class="film__categories">
					<router-link v-for="(category, index) in films[filmID].categories" :to="'/categories/' + category" :key="index" :class="'film__category film__category--' + category"> {{category.replace(/[^a-zA-Z\d]/g, ' ')}} </router-link>
				</div>
				<div class="film__money">
					<div class="film__money-item" v-if="films[filmID].budget != null">
						<div class="film__money-type">Budget</div>
						<div class="film__money-value">$ {{films[filmID].budget}}</div>
					</div>
					<div class="film__money-item" v-if="films[filmID].boxoffice != null">
						<div class="film__money-type">Box Office</div>
						<div class="film__money-value">$ {{films[filmID].boxoffice}}</div>
					</div>
				</div>
			</div>
			<p class="film__synopsis">{{films[filmID].synopsis}}</p>
			<Trailer v-if="films[filmID].trailer != null" :youtube="films[filmID].trailer" />
			<ul class="seasons" v-if="films[filmID].type.value != 'film' ">
				<li class="season" v-for="(season, index) in films[filmID].type.data" :key="index">
					<a :href="`https://www.youtube.com/embed/${season.trailer}`" class="season__trailer" target="_blank">
						<div class="season__poster">
							<img v-if="index !=0" :src="`images/posters/${films[filmID].poster}_s${index + 1}.webp`">
							<img v-else :src="`images/posters/${films[filmID].poster}.webp`">
							<div class="season__play-btn">
								<img src="images/icons/play.svg" alt="play">
							</div>
						</div>
						<div class="season__info">
							<h6 class="season__number">Season {{index + 1}}</h6>
							<p class="season__episodes">{{season.episodes}} episodes</p>
						</div>
					</a>					
				</li>
			</ul>
			<div class="film__cast">
				<h2 class="info-section-title">Cast</h2>
				<div class="film__persons">
					<router-link :to="`/actor/${actor.image}`" class="actor" v-for="(actor, index) in films[filmID].actors" :key="index">
						<div class="actor__image">
							<img :src="`images/actors/${actor.image}.jpg`" alt="">
						</div>
						<div class="actor__info">
							<h3 class="actor__names">{{actor.name}}</h3>
							<p class="actor__role"> {{actor.role}} </p>
						</div>
					</router-link>
				</div>
			</div>
			<div class="awards" v-if="films[filmID].awards != null">
				<h2 class="info-section-title">Awards</h2>
				<div class="awards__list">
					<div class="award" v-for="(award, index) in films[filmID].awards" :key="index">
						<h3 class="award__title"> {{award.title}} </h3>
						<ul class="award__nominations">
							<li v-for="(nomination, index) in award.nominations" :key="index"> {{nomination}} </li>
						</ul>
					</div>
				</div>
			</div>
			<div class="parts" v-if="films[filmID].parts != null">	
				<h2 class="info-section-title">Prequels / Sequels</h2>
				<ul class="parts__list">
					<li class="parts__item" v-for="(part, index) in partsList" :key="index">
						<router-link :to="`/film/${part.id}`">
							<img :src="`images/posters/${part.poster}.webp`" alt="" class="parts__poster">
						</router-link>
					</li>
				</ul>
			</div>
		</article>		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import Trailer from './film/Trailer'

	export default {
		names: 'Film',
		props: ['id'],
		computed: {
			...mapState(['films']),
			filmID() {
				let id = this.films.findIndex(f => parseInt(f.id) === parseInt(this.id));
    			return id;
			},
			partsList() {
				let partsListData = [];
				let id = this.films.findIndex(f => parseInt(f.id) === parseInt(this.id));
				let regex = new RegExp(this.films[id].parts);
				for(let i = 0; i < this.films.length; i++) {
					if(regex.test(this.films[i].parts)) {
						partsListData.push(this.films[i])
					}				
				}
				return partsListData;
			}
		},
		created() {
			this.$store.dispatch('LOAD_FILMS');
		},
		components: {
			Trailer
		}
	}
</script>

<style>
	.film__title {
		color: var(--base-color);
		font-size: 2.5rem;
	}

	.film__header {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
		height: 500px;
	}

	@media (max-width: 680px) {
		.film__header {
			height: 350px;
		}
	}

	.film__poster {
		width: auto;
		height: 100%;
	}

	.film__poster img {
		width: auto;
		height: 100%;
	}

	.film__info {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: auto;
		border-bottom: 4px solid #f2f2f2;
		padding-right: 20px;
		padding-bottom: 20px;
	}

	@media(max-width: 500px) {
		.film__header {
			height: auto;
			flex-direction: column;
		}
		.film__poster {
			width: 100%;
		}
		.film__poster img {
			width: 100%;
		}
		.film__info {
			padding-right: 0;
		}
	}

	.film__basic {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.film__year {
		color: #fff;
		background-color: var(--base-color);
		padding: 5px 15px;
	}

	.film__genres {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.film__genre {
		display: block;
		padding: 5px 15px;
		background-color: #ffe6b3;
		transition: .3s;
		font-size: 14px;
	}
	.film__genre:hover {
		background-color: #ffdd99;
	}

	.film__runtime, .film__country {
		padding: 5px 15px;
		background-color: #f2f2f2;
	}

	.film__crew {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.film__crew--director {
		margin-bottom: 0;
	}

	.crew__position {
		font-weight: bold;
		background-color: #d2d2d2;
		padding: 5px 15px;
	}

	.crew__names {
		background-color: #f2f2f2;
		padding: 10px 15px;
	}

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

	.film__subinfo {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.film__categories {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
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

	.film__money {
		display: flex;
		gap: 15px;
	}

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

	@media (max-width: 930px) {
		.film__money {
			flex-wrap: wrap;
			justify-content: flex-end;
		}
	}

	@media (max-width: 500px) {
		.film__subinfo {
			flex-direction: column;
		}
		.film__categories {
			margin-bottom: 10px;
		}
		.film__money {
			justify-content: flex-start;
		}
	}

	.film__synopsis {
		color: #fff;
		font-size: 20px;
		background-color: #000;
		padding: 30px;
		line-height: 1.5;
		border-bottom: 2px solid #fff;
	}

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

	/*seasons*/

	.seasons {
		display: flex;
		gap: 20px;
		margin-top: 20px;
		overflow-x: auto;
	}

	.season {
		position: relative;
		width: 200px;
		flex-shrink: 0;
	}

	.season__poster {
		width: 100%;
		height: 200px;
		position: relative;
	}

	.season__poster img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.season__play-btn {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
	}

	.season__play-btn img {
		width: 50px;
		height: 50px;
	}

	.season__info {
		color: #fff;
		text-align: center;
	}

	.season__number {
		font-size: 18px;
		background-color: #000;
		padding-top: 10px;
		padding-bottom: 10px;
		text-transform: uppercase;
	}

	.season__episodes {
		font-size: 14px;
		background-color: #777;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.parts {
		border-top: 1px solid #5b5b5b;
		padding-top: 20px;
	}
	.parts__list {
		display: flex;
		gap: 15px;
		margin-top: 15px;
		margin-bottom: 30px;
		overflow-x: auto;
	}
	.parts__poster {
		width: 120px;
		height: 180px;
	}
	@media (max-width: 930px) {
		.parts__link {
			margin-bottom: 10px;
		}
	}
	.parts .router-link-active {
		opacity: .5;
		cursor: default;
	}

	.awards__list {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		margin-top: 20px;
	}

	.award {
		flex-shrink: 0;
		background-color: #f2f2f2; 
	}

	.award__title, .award__nominations li {
		padding: 5px 20px;
	}

	.award__title {
		color: #fff;
		background-color: var(--base-color);
	}
</style>