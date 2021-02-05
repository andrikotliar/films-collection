<template>
	<footer class="footer">
		<div class="container footer__container">
			<div class="footer__row">
				<div class="footer__col">
					<h4 class="footer__col-title"> Categories </h4>
					<ul class="footer__col-menu">
						<li v-for="category in categoriesList" :key="category.id">
							<router-link :to="category.link"> {{category.title}} </router-link>
						</li>
					</ul>
				</div>
				<div class="footer__col">
					<h4 class="footer__col-title"> Genres </h4>
					<ul class="footer__col-menu">
						<li v-for="(genre, index) in genresList" :key="index">
							<router-link :to="`/genres/${genre}`"> {{genre}} </router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="footer__date">
				2019 - {{year}} / Films Collection
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
				categories: [
					{
						id: 1,
						title: 'Films',
						link: '/films/1'
					},
					{
						id: 2,
						title: 'Most Favorite',
						link: '/categories/special-favorite' 
					},
					{
						id: 3,
						title: 'Most Watched',
						link: '/categories/most-watched' 
					},
					{
						id: 4,
						title: 'Cinema Watched',
						link: '/categories/cinema-watched' 
					},
					{
						id: 5,
						title: 'Series',
						link: '/categories/series' 
					}
				],
				genresList: ['Sci-Fi', 'Adventure', 'Fantasy', 'Action', 'Animation']
			}
		},
		computed: {
			categoriesList() {
				let categories = this.categories;
				let currentYearLink = `/years/${this.year}`
				let newest = {
					id: 6,
					title: 'Newest',
					link: currentYearLink
				}
				categories.push(newest);
				return categories;
			}
		}
	}
</script>

<style>
	 .footer {
		 background-color: #191919;
		 padding: 40px 0;
		 color: #fff;
	}
	.footer__container {
		 flex-direction: column;
	}
	 .footer__row {
		 display: flex;
		 margin-bottom: 40px;
	}
	 .footer__col-title {
		 text-transform: uppercase;
		 margin-bottom: 15px;
	}
	 .footer__col-menu {
		 display: flex;
		 flex-wrap: wrap;
	}
	 .footer__col-menu li {
		 margin-right: 10px;
		 margin-bottom: 10px;
	}
	 .footer__col-menu li a {
		 display: block;
		 padding: 10px 15px;
		 border: 2px solid #fff;
		 border-radius: 5px;
		 transition: 0.3s;
	}
	 .footer__col-menu li a:hover {
		 color: #000;
		 background-color: #fff;
	}
	 .footer__date {
		 text-transform: uppercase;
		 text-align: center;
		 color: #fff;
		 font-size: 12px;
	}
	 @media (max-width: 550px) {
		 .footer__row {
			 flex-wrap: wrap;
		}
		 .footer__col {
			 margin-bottom: 15px;
		}
	}
</style>