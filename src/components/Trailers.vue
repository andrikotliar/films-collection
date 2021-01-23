<template>
	<div class="page container">
		<h2 class="page-title">New trailers</h2>
		<div class="trailers">
			<div class="trailers__main" v-if="data.items != undefined">
				<iframe width="853" height="480" :src="`https://www.youtube.com/embed/${currentVideo}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
			<div class="trailers__list">
				<div class="trailer" v-for="video in data.items" :data-url="video.snippet.resourceId.videoId" @click="changeCurrentVideo">
					<div class="trailer__image">
						<img class="trailer__image" :src="`https://i.ytimg.com/vi/${video.snippet.resourceId.videoId}/hqdefault.jpg`" :alt="video.snippet.title">
					</div>
					<h3 class="trailer__title">{{video.snippet.title}}</h3>
				</div>
			</div>				
		</div>
		<h2 class="page-title">Releases calender</h2>
		<table class="calender">
			<thead class="calender__header">
				<tr>
					<th class="calender__cell">Film Title</th>
					<th class="calender__cell">Release</th>
				</tr>
			</thead>
			<tbody class="calender__body">
				<tr v-for="film in calender">
					<td class="calender__film-title calender__cell">
						<span v-if="film.shortDate < currentDate" class="calender__film-released">Released</span>
						{{film.title}}
					</td>
					<td class="calender__film-date calender__cell">{{film.date}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'Trailers',
		data() {
			return {
				playListUrl: 'https://www.googleapis.com/youtube/v3/playlistItems',
				calenderUrl: 'database/calender.json',
			    part: 'snippet',
			    key: 'AIzaSyAHDRCDIiKoi1wm_01FEAsGaCFHrM2Gh8k',
			    maxResults: 20,
			    playlistId: 'PL0mF6qhBv3rI3Gkd_MN1tEgdvshAD6QXA',
			    currentVideo: null,
			    data: {},
			    calender: {},
			    currentDate: null
			}
		},
		mounted() {
			this.getTrailers();
			this.getCalender();
			this.generateCurrentDate();
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
					this.currentVideo = data.items[0].snippet.resourceId.videoId;
				});
			},
			getCalender() {
				fetch(this.calenderUrl)
				.then(response => response.json())
				.then(data => {
					this.calender = data.sort((a, b) => a.shortDate > b.shortDate ? 1 : -1);
				})
			},
			changeCurrentVideo(e) {
				this.currentVideo = e.target.closest('.trailer').dataset.url;
			},
			generateCurrentDate() {
				let currentDay = new Date().getDate().toString();
				let currentYear = new Date().getFullYear().toString();
				let currentMonth = new Date().getMonth() + 1;
				if(currentDay < 10) {
					currentDay = '0' + currentDay;
				}
				if(currentMonth < 10) {
					currentMonth = '0' + currentMonth;
				}
				let currentDateStr = currentYear.slice(2, 4) + currentMonth + currentDay;
				this.currentDate = currentDateStr;
			}
		}
	}
</script>

<style>
	.trailers {
		display: flex;
		width: 100%;
		height: 480px;
		overflow: hidden;
		margin: 20px 0;
	}

	.trailers__main {
		width: 70%;
		background-color: #000;
	}

	.trailers__main iframe {
		width: 100%;
		height: 100%;
	}

	.trailers__list {
		width: 30%;
		background-color: #000;
		overflow: auto;
	}
	.trailers__list::-webkit-scrollbar {
		width: 8px;
	}
	 
	.trailers__list::-webkit-scrollbar-thumb {
		background-color: #8a8a8a;
	}

	.trailer {
		display: flex;
		align-items: center;
		padding: 10px 20px;
		border-bottom: 1px solid #636363;
		cursor: pointer;
	}

	.trailer:last-child {
		border-bottom: none;
	}

	.trailer__image {
		width: 35%;
		height: 50px;
	}

	.trailer__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.trailer__title {
		color: #c2c2c2;
		font-size: 0.8rem;
		width: 65%;
		letter-spacing: 1px;
		padding-left: 15px;
	}

	/*calender*/

	.calender {
		width: 100%;
		margin-top: 20px;
		border-collapse: collapse;
	}

	.calender__header {
		border-bottom: 4px solid #ff8c1a;
	}

	.calender__header th {
		text-align: left;
		text-transform: uppercase;
		background-color: #ffb366;
	}

	.calender__body tr {
		transition: .3s;
	}

	.calender__body tr:hover {
		background-color: #ffe6cc;
	}

	.calender__cell {
		padding: 10px 20px;
		border: 1px solid #ffb366;
	}

	.calender__film-released {
		display: inline-block;
		color: #fff;
		font-size: .8rem;
		text-transform: uppercase;
		background-color: #ff5858;
		padding: 5px 10px;
		border-radius: 2px;
		margin-right: 10px;
	}

	@media (max-width: 950px) {
		.trailers {
			flex-direction: column;
			height: auto;
		}
		.trailers__main {
			width: 100%;
		}
		.trailers__list {
			width: 100%;
			height: 500px;
		}
		.trailer__image {
			width: 25%;
			height: 100px;
		}
		.trailer__title {
			font-size: 1.2rem;
		}
	}

	@media (max-width: 750px) {
		.trailers__main {
			height: 400px;
		}
	}

	@media (max-width: 450px) {
		.trailers__main {
			height: 250px;
		}
		.trailer__image {
			width: 40%;
		}
		.trailer__title {
			font-size: 1rem;
		}
	}	
</style>