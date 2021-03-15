<template>
    <nav class="year-b-menu">
        <router-link :to="`/year/${prevYear}`" class="year-b-menu__link year-b-menu__link--prev" v-if="+year > 1977"> {{prevYear}} </router-link>
        <YearsSelect disabledText="All years" className="select-wrapper--yearPage" :exeption="year" />
        <router-link :to="`/year/${nextYear}`" class="year-b-menu__link year-b-menu__link--next" v-if="+year < currentYear"> {{nextYear}} </router-link>
    </nav>    
</template>
<script>
	import YearsSelect from './YearsSelect';
    export default {
        name: 'YearBottomMenu',
        props: ['year', 'currentYear'],
        data() {
        	return {
        		selectedYear: ''
        	}
        },
        computed: {
            prevYear() {
				return +this.year - 1
			},
			nextYear() {
				return +this.year + 1
			}
        },
        components: {
        	YearsSelect
        }
    }
</script>
<style>
	.year-b-menu {
		display: flex;
		align-items: center;
		gap: 20px; 
		margin-top: 20px;
	}

	.year-b-menu__link {
		position: relative;
		display: block;
		color: #fff;
		font-size: 18px;
		background-color: var(--base-color);
		padding: 10px 60px;
		text-align: center;
		text-transform: uppercase;
		transition: .3s;
	}

	.year-b-menu__link--prev:before,
	.year-b-menu__link--next:after {
		position: absolute;
		border: 10px solid transparent;
		content: '';
	}

	.year-b-menu__link--prev:before {
		left: 5px;
		border-right-color: #fff;
	}

	.year-b-menu__link--next:after {
		right: 5px;
		border-left-color: #fff;
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