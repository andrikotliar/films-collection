<template>
    <div class="parts">	
        <h2 class="info-section-title">Prequels / Sequels</h2>
        <ul class="parts__list">
            <li class="parts__item" v-for="(part, index) in partsList" :key="index">
                <router-link :to="`/film/${part.id}`">
                    <img :src="`images/posters/${part.poster}.webp`" alt="" class="parts__poster">
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'FilmParts',
        props: ['data', 'filmID'],
        computed: {
            partsList() {
				let partsListData = [];
				let id = this.data.findIndex(f => parseInt(f.id) === parseInt(this.filmID));
				let regex = new RegExp(this.data[id].parts);
				for(let i = 0; i < this.data.length; i++) {
					if(regex.test(this.data[i].parts)) {
						partsListData.push(this.data[i])
					}				
				}
				return partsListData;
			}
        }
    }
</script>

<style>
	.parts {
		padding-top: 20px;
	}
	.parts__list {
		display: flex;
		gap: 15px;
		margin-top: 15px;
		margin-bottom: 30px;
		overflow-x: auto;
	}
	.parts__poster {
		width: 120px;
		height: 180px;
	}
	@media (max-width: 930px) {
		.parts__link {
			margin-bottom: 10px;
		}
	}
	.parts .router-link-active {
		opacity: .5;
		cursor: default;
	}
</style>