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
							<router-link :to="`/genres/${genre}`"> {{genre}} </router-link>
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
				year: new Date().getFullYear(),
				menu: [
					{
						id: 1,
						title: 'Main links',
						extended: true,
						links: [
							{
								id: 1,
								linkTitle: 'All films',
								linkAdress: '/films/1' 
							},
							{
								id: 2,
								linkTitle: 'List',
								linkAdress: '/list' 
							},
							{
								id: 3,
								linkTitle: 'Trailers',
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
								linkAdress: '/categories/special-favorite' 
							},
							{
								id: 2,
								linkTitle: 'Most Watched',
								linkAdress: '/categories/most-watched' 
							},
							{
								id: 3,
								linkTitle: 'Cinema Watched',
								linkAdress: '/categories/cinema-watched' 
							},
							{
								id: 4,
								linkTitle: 'TV Series',
								linkAdress: '/categories/series' 
							},
							{
								id: 5,
								linkTitle: 'Newest',
								linkAdress: '/years/2019' 
							}
						]
					}
				],
				genresList: ['Sci-Fi', 'Adventure', 'Fantasy', 'Action', 'Animation']
			}
		}
	}
</script>

<style src="stylesElems/footer.css"></style>