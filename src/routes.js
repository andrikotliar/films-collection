import Home from './components/Home.vue';
import Film from './components/Film.vue';
import List from './components/List.vue';
import Trailers from './components/Trailers.vue';
import Twitter from './components/Twitter.vue';
import Years from './components/Years.vue';
import Actor from './components/Actor.vue';
import Films from './components/Films.vue';
import FilmsByCategory from './components/FilmsByCategory.vue';
import FilmsByYear from './components/FilmsByYear.vue';

import SearchResults from './components/SearchResults.vue';

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
	{path: '/twitter', component: Twitter},
	{path: '/years', component: Years}
]

export default routes