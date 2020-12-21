<template>
	<section class="search-field">
		<div class="container">
			<input type="text" class="search-field-input" v-model="search" placeholder="Search film..." v-on:keyup.enter="searchFilm">
			<router-link :to="`/search/${this.search}`" class="search-field-button">
				<img src="images/icons/search.svg" alt="Seatch button">
			</router-link>
		</div>
	</section>
</template>

<script>
	name: 'Search'
	export default {
		data() {
			return {
				search: ''
			}
		},
		methods: {
			searchFilm() {
				this.$router.push(`/search/${this.search}`);
			}
		}
	}
</script>

<style src="stylesElems/home-search.css"></style>