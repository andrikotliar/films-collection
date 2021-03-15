import Home from './components/Home.vue';
import Film from './components/Film.vue';
import Trailers from './components/Trailers.vue';
import Actor from './components/Actor.vue';
import Films from './components/Films.vue';
import FilmsByCategory from './components/FilmsByCategory.vue';
import FilmsByYear from './components/FilmsByYear.vue';
import Calender from './components/Calender.vue';
import SearchResults from './components/SearchResults.vue';

const routes = [
	{path: '/', component: Home},
	{
		path: '/film/:id', 
		props: true,
		component: Film
	},
	{
		path: '/categories/:category', 
		props: true,
		component: FilmsByCategory
	},
	{
		path: '/search/', 
		component: FilmsByCategory
	},
	{
		path: '/genres/:category', 
		props: true,
		component: FilmsByCategory
	},
	{
		path: '/year/:year', 
		props: true,
		component: FilmsByYear
	},
	{
		path: '/search/:result', 
		props: true,
		component: SearchResults
	},
	{
		path: '/production/:category', 
		props: true,
		component: FilmsByCategory
	},
	{
		path: '/country/:category', 
		props: true,
		component: FilmsByCategory
	},
	{
		path: '/actor/:actor',
		props: true,
		component: Actor
	},
	{
		path: '/films/:page',
		props: true,
		component: Films
	},
	{path: '/trailers', component: Trailers},
	{path: '/calender', component: Calender}
]

export default routes