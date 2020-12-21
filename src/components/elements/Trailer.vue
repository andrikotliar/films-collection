<template>
	<div class="film-info__trailer" @click="addTrailer">
		<img :src="`https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`" class="film-info__trailer-cover" alt="Avatar Trailer">
		<button class="film-info__trailer-btn">
			<img src="images/icons/play.svg" alt="Play button">
		</button>
	</div>
</template>

<script>
	export default {
		name: 'FilmTrailer',
		props: ['youtube'],
		methods: {
			addTrailer() {
				let trailer = document.querySelector('.film-info__trailer');
				let button = trailer.querySelector('.film-info__trailer-btn');
				let cover = trailer.querySelector('.film-info__trailer-cover');
				let iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
			    iframe.setAttribute('allow', 'autoplay');
			    iframe.setAttribute('src', `https://www.youtube.com/embed/${this.youtube}?rel=0&showinfo=0&autoplay=1`);
			    iframe.classList.add('film-info__trailer-cover');	

		        button.remove();
		        cover.remove();
		        trailer.appendChild(iframe);
			}
		}
	}
</script>

<style src="stylesElems/film-trailer.css"></style>