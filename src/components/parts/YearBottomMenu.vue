<template>
    <nav class="year-b-menu">
        <router-link :to="`/years/${prevYear}`" class="year-b-menu__link year-b-menu__link--prev" v-if="+year > 1977"> {{prevYear}} </router-link>
        <router-link to="/years/" class="year-b-menu__link year-b-menu__link--all"> All years </router-link>
        <router-link :to="`/years/${nextYear}`" class="year-b-menu__link year-b-menu__link--next" v-if="+year < currentYear"> {{nextYear}} </router-link>
    </nav>    
</template>
<script>
    export default {
        name: 'YearBottomMenu',
        props: ['year', 'currentYear'],
        computed: {
            prevYear() {
				return +this.year - 1
			},
			nextYear() {
				return +this.year + 1
			}
        }
    }
</script>
<style>
	.year-b-menu {
		display: flex;
		flex-wrap: wrap;
		gap: 20px; 
		margin-top: 20px;
	}

	.year-b-menu__link {
		position: relative;
		display: block;
		background-color: #f2f2f2;
		padding: 10px 60px;
		text-align: center;
		text-transform: uppercase;
		transition: .3s;
	}

	.year-b-menu__link:hover {
		background-color: #ddd;
	}

	.year-b-menu__link--all {
		flex-grow: 1;
	}

	.year-b-menu__link--prev:before,
	.year-b-menu__link--next:after {
		position: absolute;
		border: 10px solid transparent;
		content: '';
	}

	.year-b-menu__link--prev:before {
		left: 5px;
		border-right-color: #171717;
	}

	.year-b-menu__link--next:after {
		right: 5px;
		border-left-color: #171717;
	}

	@media (max-width: 620px) {
		.year-b-menu__link {
			padding: 10px 40px;
		}
	}

	@media (max-width: 480px) {
		.year-b-menu {
			flex-direction: column;
		}
	}
</style>