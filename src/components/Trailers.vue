<template>
	<div id="Trailers" class="trailers-page page">
		<div class="container container-start container-column">
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
	</div>
</template>

<script>
	export default {
		name: 'Test',
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

<style src="stylesElems/trailers.css"></style>