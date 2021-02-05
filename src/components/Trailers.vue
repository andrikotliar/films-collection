<template>
	<div class="page container">
		<h2 class="page-title">New trailers</h2>
		<div class="trailers">
			<div class="trailer" v-for="(video, index) in data.items" :data-url="video.snippet.resourceId.videoId" :key="index">
				<div class="trailer__cover" @click="openModal">
					<img class="trailer__image" :src="`https://i.ytimg.com/vi/${video.snippet.resourceId.videoId}/hqdefault.jpg`" :alt="video.snippet.title">
					<img src="images/icons/play.svg" alt="" class="trailer__play">
				</div>
			</div>
		</div>
		<TrailersModal :currentVideo="currentVideo" />
	</div>
</template>

<script>
	import TrailersModal from './parts/TrailersModal';

	export default {
		name: 'Trailers',
		data() {
			return {
				playListUrl: 'https://www.googleapis.com/youtube/v3/playlistItems',
			    part: 'snippet',
			    key: 'AIzaSyAHDRCDIiKoi1wm_01FEAsGaCFHrM2Gh8k',
			    maxResults: 20,
			    playlistId: 'PL0mF6qhBv3rI3Gkd_MN1tEgdvshAD6QXA',
			    currentVideo: null,
			    data: {}
			}
		},
		mounted() {
			this.getTrailers();
		},
		methods: {
			getTrailers() {
				fetch(this.playListUrl + '?' + new URLSearchParams({
				    part: this.part,
				    key: this.key,
				    maxResults: this.maxResults,
				    playlistId: this.playlistId
				})).then(response => response.json()).then(data => {
					this.data = data;
				});
			},
			openModal(e) {
            	let trailerModal = document.querySelector('.trailers-modal');
				trailerModal.classList.add('trailers-modal--visible');
				document.body.style.overflow = 'hidden';

				let trailersVideo = document.querySelector('.trailers-modal__video');
				let url = e.target.closest('.trailer').dataset.url;
				trailersVideo.setAttribute('src', `https://www.youtube.com/embed/${url}`);
			}
		},
		components: {
			TrailersModal
		}
	}
</script>

<style>
	.trailers {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		margin-top: 20px;
	}
	.trailer {
		width: 100%;
	}
	.trailer__cover {
		position: relative;
		width: 100%;
		height: 180px;
		font-size: 0;
		cursor: pointer;
	}
	@media (max-width: 850px) {
		.trailers {
			grid-template-columns: repeat(2, 1fr);
		}
		.trailer__cover {
			height: 200px;
		}
	}
	@media (max-width: 550px) {
		.trailers {
			display: block;
		}
		.trailer {
			margin-bottom: 20px;
		}
		.trailer:last-child {
			margin-bottom: 0;
		}
		.trailer__cover {
			height: auto;
		}
	}
	.trailer__cover:after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
		content: '';
		opacity: 0;
		transition: .3s;
	}
	.trailer__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.trailer__play {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 10;
		width: 40px;
		height: 40px;
		opacity: 0;
		transition: .3s;
	}
	.trailer:hover .trailer__cover:after,
	.trailer:hover .trailer__play {
		opacity: 1;
	}
	@media (max-width: 550px) {
		.trailer__play {
			opacity: 1;
		}
		.trailer__cover:after {
			display: none;
		}
	}
</style>