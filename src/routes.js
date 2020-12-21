import Home from './components/Home.vue'
import Film from './components/Film.vue'
import List from './components/List.vue'
import Category from './components/Category.vue'
import AllFilms from './components/AllFilms.vue'
import Trailers from './components/Trailers.vue'
import Twitter from './components/Twitter.vue'

const routes = [
	{path: '/', component: Home},
	{
		path: '/film/:id', 
		props: true,
		component: Film
	},
	{path: '/list', component: List},
	{
		path: '/category/:category', 
		props: true,
		component: Category
	},
	{
		path: '/search/', 
		component: Category
	},
	{
		path: '/genre/:category', 
		props: true,
		component: Category
	},
	{
		path: '/year/:category', 
		props: true,
		component: Category
	},
	{
		path: '/search/:category', 
		props: true,
		component: Category
	},
	{
		path: '/all_films/:page',
		props: true,
		component: AllFilms
	},
	{path: '/trailers', component: Trailers},
	{path: '/twitter', component: Twitter}
]

export default routes