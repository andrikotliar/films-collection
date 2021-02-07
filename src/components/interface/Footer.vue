<template>
	<footer class="footer">
		<div class="container footer__container">
			<div class="footer__row">
				<h4 class="footer__row-title"> Categories </h4>
				<ul class="footer__row-menu">
					<li v-for="category in categoriesList" :key="category.id">
						<router-link class="footer__row-menu-link" :to="category.link"> {{category.title}} </router-link>
					</li>
				</ul>
			</div>
			<div class="footer__row">
				<h4 class="footer__row-title"> Genres </h4>
				<ul class="footer__row-menu">
					<li v-for="(genre, index) in genresList" :key="index">
						<router-link class="footer__row-menu-link" :to="`/genres/${genre}`"> {{genre}} </router-link>
					</li>
				</ul>
			</div>
			<div class="footer__date">
				2019 - {{year}} <span class="footer__date-separator">/</span> Films Collection
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
						title: 'All films',
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
		width: 100%;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
	}
	 .footer__row {
		 text-align: center;
		 margin-bottom: 20px;
	}
	.footer__row-title {
		color: #fff;
		text-transform: uppercase;
		padding: 10px;
	}
	.footer__row-menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
		margin-top: 5px;
	}
	.footer__row-menu-link {
		display: block;
		color: #000;
		font-weight: bold;
		background-color: #fff;
		padding: 6px 10px;
		transition: .3s;
		border-top: 4px solid #fff;
		border-bottom: 4px solid #fff;
	}

	.footer__row-menu-link:hover {
		margin-top: -5px;
		border-top: 4px solid var(--base-color);
	}

	.footer__date {
		font-size: 12px;
		text-align: center;
		text-transform: uppercase;
		margin-top: 20px;
	}
	.footer__date-separator {
		padding: 0 10px;
	}
</style>