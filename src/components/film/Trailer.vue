<template>
	<div class="film__trailer" @click="addTrailer">
		<img :src="`https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`" class="film__trailer-cover" alt="">
		<button class="film__trailer-btn" @click="addTrailer">
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
				let trailer = document.querySelector('.film__trailer');
				let button = trailer.querySelector('.film__trailer-btn');
				let cover = trailer.querySelector('.film__trailer-cover');
				let iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
			    iframe.setAttribute('allow', 'autoplay');
			    iframe.setAttribute('src', `https://www.youtube.com/embed/${this.youtube}?rel=0&showinfo=0&autoplay=1`);
			    iframe.classList.add('film__trailer-cover');	

		        button.remove();
		        cover.remove();
		        trailer.appendChild(iframe);
			}
		}
	}
</script>

<style>
	.film__trailer {
		position: relative;
	    width: 100%;
	    height: 0;
	    background-color: #000;
	    padding-bottom: 56.25%;
	    cursor: pointer;
	}

	.film__trailer-cover {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    border: none;
	    object-fit: cover;
	}

	.film__trailer-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		border: none;
		background: transparent;
		outline: none;
		width: 80px;
		height: 80px;
		height: auto;
		margin-left: -40px;	
		margin-top: -40px;
		z-index: 1;
		padding: 0;
		cursor: pointer;
	}

	.film__trailer-btn img {
		width: 100%;
		height: 100%;
	}
</style>