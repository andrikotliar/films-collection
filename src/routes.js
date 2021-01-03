import Home from './components/Home.vue';
import Film from './components/Film.vue';
import List from './components/List.vue';
import FilmsByCategory from './components/FilmsByCategory.vue';
import Films from './components/Films.vue';
import Trailers from './components/Trailers.vue';
import Twitter from './components/Twitter.vue';
import YearsList from './components/YearsList.vue';
import Year from './components/Year.vue';
import Actor from './components/Actor.vue';

const routes = [
	{path: '/', component: Home},
	{
		path: '/film/:id', 
		props: true,
		component: Film
	},
	{path: '/list', component: List},
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
		path: '/years/:year', 
		props: true,
		component: Year
	},
	{
		path: '/search/:category', 
		props: true,
		component: FilmsByCategory
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
	{path: '/twitter', component: Twitter},
	{path: '/years', component: YearsList}
]

export default routes