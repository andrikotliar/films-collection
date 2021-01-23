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

<style>
	.twitter__tags {
		position: sticky;
		top: 0;
		width: 25%;
		margin-right: 20px;
		padding: 10px 20px;
		float: left;
	}

	@media (max-width: 850px) {
		.twitter__tags {
			width: 30%;
		}
	}

	.twitter__tags-title {
		font-size: 32px;
		line-height: 38px;
		padding-bottom: 10px;
	}

	@media (max-width: 650px) {
		.twitter__tags {
			position: static;
			width: 100%;
			padding: 0;
			margin-right: 0;
			margin-bottom: 20px;
			float: none;
		}
		.twitter__menu {
			display: inline-flex;
			flex-wrap: wrap;
			gap: 15px;
		}
		.twitter__menu a {
			border-bottom: 0;
		}
	}

	.twitter__menu a {
		display: block;
		font-size: 18px;
		padding: 20px;
		border-bottom: 1px solid #ddd;
		transition: .3s;
		background-color: #f2f2f2;
	}

	.twitter__menu a:hover {
		background-color: #ddd;
	}

	.twitter__menu a:last-child {
		border-bottom: 0;
	}

	.twitter__feed {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: calc(75% - 20px);
		min-height: 100vh;
	}

	@media (max-width: 850px) {
		.twitter__feed {
			width: calc(60% - 20px);
		}
	}

	@media (max-width: 650px) {
		.twitter__feed {
			width: 100%;
		}	
	}

	.all-tweets-btn {
		display: block;
		color: #fff;
	    width: 240px;
	    text-align: center;
	    font-weight: bold;
	    text-transform: uppercase;
	    background-color: #2b7bb9;
	    border-radius: 5px;
	    padding: 15px 0;
	    margin: 0 auto;
	    transition: .3s;
	}

	.all-tweets-btn:hover {
		background-color: #47a3eb;
	}
</style>