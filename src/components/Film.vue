<template>
	<main class="film-info page" v-if="films[filmID] != undefined">
		<h1 class="film-info__title"> {{films[filmID].title}} </h1>
		<section class="film-info__categories" v-if="films[filmID].categories != null">
			<router-link 
				v-for="(category, index) in films[filmID].categories"
				:to="'/category/' + category.link"  
				:key="index" 
				:class="'film-info__category film-info__category--' + category.link">
				{{category.title}}
			</router-link>
		</section>
		<section class="film-info__header">
			<div class="film-info__poster">
				<img :src="`images/posters/${films[filmID].poster}.jpg`" :alt="films[filmID].title">
			</div>
			<Trailer :youtube="films[filmID].trailer" />
		</section>
		<section class="film-info__genres">
			<router-link 
				v-for="(genre, index) in films[filmID].genres"
				:to="'/genre/' + genre"  
				:key="index" 
				class="film-info__genre">
				{{genre}}
			</router-link>
		</section>
		<p class="film-info__synopsis">{{films[filmID].synopsis}}</p>
		<section class="film-info__main">
			<ul class="film-info__data">
				<li><b>Directed by </b>{{films[filmID].director}}</li>
				<li><b>Produced by </b>{{films[filmID].producers}}</li>
				<li><b>Writtens by </b>{{films[filmID].writtens}}</li>
				<li><b>Music by </b>{{films[filmID].music}}</li>
				<li id="cinema" v-if="films[filmID].cinema != null"><b>Cinematography by </b>{{films[filmID].cinema}}</li>
			</ul>
			<ul class="film-info__data">
				<li><b>Production Co: </b>{{films[filmID].production}}</li> 
				<li class="margin"><b>Year: </b>{{films[filmID].year}}</li>
				<li><b>Runtime: </b>{{films[filmID].time}} min</li>
				<li><b>Country: </b>{{films[filmID].country}}</li>
				<li class="margin" v-if="films[filmID].budget != null"><b>Budget: </b>${{films[filmID].budget}}</li>
				<li v-if="films[filmID].boxoffice != null"><b>Box Office: </b>${{films[filmID].boxoffice}}</li>
			</ul>
		</section>
		<section class="film-info__cast">
			<h2 class="section-title">Cast</h2>
			<div class="film-info__persons">
				<div class="actor" v-for="actor in films[filmID].actors">
					<div class="actor__image">
						<img :src="`images/actors/${actor.image}.jpg`" alt="">
					</div>
					<div class="actor__info">
						<h3 class="actor__name">{{actor.name}}</h3>
						<p class="actor__role"> {{actor.role}} </p>
					</div>
				</div>
			</div>
		</section>
		<section class="film-info__awards" v-if="films[filmID].awards != null">
			<h2 class="section-title">Awards</h2>
			<div class="film-info__awards-list">
				<div class="film-info__award" v-for="award in films[filmID].awards">
					<h3 class="film-info__award-title"> {{award.title}} </h3>
					<ul class="film-info__nominations">
			          <li v-for="nomination in award.nominations"> {{nomination}} </li>
			        </ul>
				</div>
			</div>
		</section>
		<section class="series" v-if="films[filmID].type.value != 'film' ">
			<h2 class="section-title">Number of Episodes</h2>
			<div class="series__episodes">
				<div class="series__episodes-list">
					<div class="series__episodes-item" v-for="season in films[filmID].type.data.seasons">
						<div class="series__episodes-season">Season: {{season[0]}}</div>
						<div class="series__episodes-count">Episodes: {{season[1]}}</div>
					</div>
				</div>
			</div>
			<div class="series__trailers">
				<h2 class="section-title">Trailers Gallery</h2>
				<div class="series__trailers-list">
					<a :href="'https://www.youtube.com/embed/' + trailer.youtube" class="series__trailers-item" v-for="trailer in films[filmID].type.data.trailers" target="_blank">
						<div class="series__trailers-poster">
							<img :src="'./src/images/posters/' + trailer.poster + '.jpg'">
						</div>
						<div class="series__trailers-cover">
							<h6 class="series__trailers-title">Season {{trailer.num}}</h6>
							<div class="play-btn">
								<img src="../images/icons/play.svg" alt="play">
							</div>
						</div>
					</a>
				</div>
			</div>
		</section>
		<section class="parts" v-if="films[filmID].parts != null">	
			<h2 class="section-title">Prequels / Sequels</h2>
			<ul class="parts__list">
				<li class="parts__item" v-for="parts in partsList">
					<router-link :to="`/film/${parts.link}`">
						<img :src="`./src/images/posters/${parts.poster}.jpg`" alt="" class="parts__poster">						
					</router-link>
				</li>
			</ul>
		</section>
	</main>
</template>

<script>
	import {mapState} from 'vuex';
	import Trailer from 'elements/Trailer'

	export default {
		name: 'Film',
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
		methods: {
			pageTop() {
				document.documentElement.scrollTop = 0
			}
		},
		created() {
			document.documentElement.scrollTop = 0;
			this.$store.dispatch('LOAD_FILMS');
			this.$store.dispatch('LOAD_PARTS');
		},
		components: {
			Trailer
		}
	}
</script>

<style src="stylesElems/film.css"></style>