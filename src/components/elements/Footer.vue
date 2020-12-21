<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__row">
				<div class="footer__col" v-for="item in menu" :key="item.id">
					<h4 class="footer__col-title"> {{item.title}} </h4>
					<ul class="footer__col-menu">
						<li v-for="link in item.links" :key="link.id">
							<router-link :to="link.linkAdress"> {{link.linkTitle}} </router-link>
						</li>
						<li v-if="item.extended">
							<a href="https://cinemarticles.netlify.app/" target="_blank">Articles</a>
						</li>
					</ul>
				</div>
				<div class="footer__col">
					<h4 class="footer__col-title"> Favorite Genres </h4>
					<ul class="footer__col-menu">
						<li v-for="genre in genresList">
							<router-link :to="`/genre/${genre}`"> {{genre}} </router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="footer__date">
				2019 - {{year}} / Film Collection
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'Footer',
		data() {
			return {
				year: 0,
				menu: [
					{
						id: 1,
						title: 'Main links',
						extended: true,
						links: [
							{
								id: 1,
								linkTitle: 'List',
								linkAdress: '/list' 
							},
							{
								id: 2,
								linkTitle: 'All films',
								linkAdress: '/all_films/1' 
							},
							{
								id: 3,
								linkTitle: 'New trailers',
								linkAdress: '/new_trailers' 
							},
							{
								id: 4,
								linkTitle: 'Twitter',
								linkAdress: '/twitter' 
							}
						]
					},
					{
						id: 2,
						title: 'Categories',
						links: [
							{
								id: 1,
								linkTitle: 'Most Favorite',
								linkAdress: '/category/c-fav' 
							},
							{
								id: 2,
								linkTitle: 'Most Watched',
								linkAdress: '/category/c-mw' 
							},
							{
								id: 3,
								linkTitle: 'Cinema Watched',
								linkAdress: '/category/c-cw' 
							},
							{
								id: 4,
								linkTitle: 'TV Series',
								linkAdress: '/category/c-tv' 
							},
							{
								id: 5,
								linkTitle: 'Newest',
								linkAdress: '/category/2019' 
							}
						]
					}
				],
				genresList: ['Sci-Fi', 'Adventure', 'Fantasy', 'Action', 'Animation']
			}
		},
		created() {
			document.documentElement.scrollTop = 0
			this.year = new Date().getFullYear()
		}
	}
</script>

<style src="stylesElems/footer.css"></style>