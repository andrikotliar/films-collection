<template>
    <ul class="seasons">
        <li class="season" v-for="(season, index) in type" :key="index">
            <div :data-url="season.trailer" class="season__trailer" target="_blank">
                <div class="season__poster" @click="openModal">
                    <img v-if="index !=0" :src="`images/posters/${poster}_s${index + 1}.webp`">
                    <img v-else :src="`images/posters/${poster}.webp`">
                    <div class="season__play-btn">
                        <img src="images/icons/play.svg" alt="play">
                    </div>
                </div>
                <div class="season__info">
                    <h6 class="season__number">Season {{index + 1}}</h6>
                    <p class="season__episodes">{{season.episodes}} episodes</p>
                </div>
            </div>					
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'SeriesSeasons',
        props: ['type', 'poster'],
		methods: {
			openModal(e) {
            	let trailerModal = document.querySelector('.trailers-modal');
				trailerModal.classList.add('trailers-modal--visible');
				document.body.style.overflow = 'hidden';

				let trailersVideo = document.querySelector('.trailers-modal__video');
				let url = e.target.closest('.season__trailer').dataset.url;
				trailersVideo.setAttribute('src', `https://www.youtube.com/embed/${url}`);
			}
		},
    }
</script>

<style>
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
		cursor: pointer;
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
</style>