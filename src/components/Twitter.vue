<template>
	<div class="page container">
		<div class="twitter">
			<aside class="twitter__tags">
				<h2 class="twitter__tags-title">Tags</h2>
				<nav class="twitter__menu">
					<a v-for="tag in tags" :href="`https://twitter.com/search?lang=en&q=(%23${tag})%20(from%3Afilm_materials)&src=typed_query`" target="_blank" rel="noreferrer noopener">#{{tag}}</a>
				</nav>
			</aside>
			<div class="twitter__feed">
				<Timeline id="film_materials" sourceType="profile" :options="{ tweetLimit: '5' }"/>
				<a href="https://twitter.com/film_materials" target="_blank" class="all-tweets-btn">All tweets</a>
			</div>				
		</div>
	</div>
</template>

<script>
	import { Timeline } from 'vue-tweet-embed';
	export default {
		name: 'TwitterPage',
		data() {
			return {
				tags: ['poster', 'posters', 'promo', 'set', 'stills', 'still']
			}
		},
		components: {
			Timeline
		}
	}
</script>

<style src="stylesElems/twitter.css"></style>