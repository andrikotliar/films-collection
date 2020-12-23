<template>
	<div class="page container">
		<Search />
		<FilmsRow category="2019" title="The newest films" reverse="true"/>
		<FilmsRow category="c-fav" title="The most favorite films" reverse="false"/>
		<FilmsRow category="c-mw" title="The most watched films" reverse="true"/>
		<FilmsRow category="c-cw" title="Cinema watched films" reverse="true"/>
		<FilmsRow category="c-tv" title="TV Series" reverse="true" className="elems-3" />
		<FilmsRow category="c-marvel" title="Marvel Cinematic Universe" reverse="true"/>
		<FilmsRowYears />
	</div>
</template>

<script>
	import Search from 'elements/Search.vue';
	import FilmsRow from 'elements/Categories.vue';
	import FilmsRowYears from 'elements/Years.vue';
	export default {
		name: 'Home',
		components: {
			Search,
			FilmsRow,
			FilmsRowYears
		}
	}
</script>

<style src="stylesElems/home.css"></style>