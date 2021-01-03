<template>
	<article class="film page container" v-if="films[filmID] != undefined">
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
						<div class="crew__position">Directed by</div>
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
					<div class="film__studio" v-for="(studio, index) in films[filmID].production">
						<router-link :to="`/production/${studio}`">{{studio.replace(/\-/g, ' ')}}</router-link><span v-if="films[filmID].production.length > 1 && index + 1 != films[filmID].production.length">,</span>
					</div>
				</div> 
			</div>
		</div>
		<div class="film__subinfo">
			<div class="film__categories">
				<router-link v-for="(category, index) in films[filmID].categories" :to="'/categories/' + category":key="index":class="'film__category film__category--' + category"> {{category.replace(/[^a-zA-Z\d]/g, ' ')}} </router-link>
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
			<li class="season" v-for="(season, index) in films[filmID].type.data">
				<a :href="`https://www.youtube.com/embed/${season.trailer}`" class="season__trailer" target="_blank">
					<div class="season__poster">
						<img :src="`images/posters/${films[filmID].poster}_s${index + 1}.webp`">
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
				<router-link :to="`/actor/${actor.image}`" class="actor" v-for="actor in films[filmID].actors">
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
				<div class="award" v-for="award in films[filmID].awards">
					<h3 class="award__title"> {{award.title}} </h3>
					<ul class="award__nominations">
						<li v-for="nomination in award.nominations"> {{nomination}} </li>
					</ul>
				</div>
			</div>
		</div>
		<div class="parts" v-if="films[filmID].parts != null">	
			<h2 class="info-section-title">Prequels / Sequels</h2>
			<ul class="parts__list">
				<li class="parts__item" v-for="parts in partsList">
					<router-link :to="`/film/${parts.link}`">
						<img :src="`images/posters/${parts.poster}.webp`" alt="" class="parts__poster">			
					</router-link>
				</li>
			</ul>
		</div>
	</article>
</template>

<script>
	import {mapState} from 'vuex';
	import Trailer from 'elements/Trailer'

	export default {
		names: 'Film',
		props: ['id'],
		computed: {
			...mapState(['films', 'parts']),
			filmID() {
				let id = this.films.findIndex(f => parseInt(f.id) === parseInt(this.id))
    			return id
			},
			partsList() {
				let partsListData = [];
				for(let i = 0; i < this.parts.length; i++) {
					if(this.parts[i].trigger == this.films[this.filmID].parts) {
						partsListData = this.parts[i].collection;
					}
				} 
				return partsListData;
			}
		},
		created() {
			this.$store.dispatch('LOAD_FILMS');
			this.$store.dispatch('LOAD_PARTS');
		},
		components: {
			Trailer
		}
	}
</script>

<style src="stylesElems/film.css"></style>