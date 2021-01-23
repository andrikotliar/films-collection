<template>
	<div class="search-field">
		<input type="text" class="search-field-input" v-model="search" placeholder="Search film..." v-on:keyup.enter="searchFilm">
		<router-link :to="`/search/${this.search}`" class="search-field-button">
			<img src="images/icons/search.svg" alt="Seatch button">
		</router-link>
	</div>
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

<style>
	.search-field {
		position: relative;
		margin-bottom: 30px;
		width: 100%;
	}
	 .search-field-input {
		width: 100%;
		font-size: 14px;
		color: #000;
		padding: 12px 15px;
		outline: none;
		border: none;
		border-radius: 5px;
		transition: 0.2s;
		background-color: #eaeaea;
	}
	 .search-field-button {
		 position: absolute;
		 top: 50%;
		 right: 0;
		 margin-top: auto;
		 margin-bottom: auto;
		 margin-left: auto;
		 margin-right: 20px;
		 cursor: pointer;
		 height: 20px;
		 width: 20px;
		 transform: translateY(-50%);
	}
	 .search-field-button img {
		 height: 100%;
		 width: 100%;
	}
	 .search-field .container {
		 position: relative;
		 max-width: 100%;
	}
</style>