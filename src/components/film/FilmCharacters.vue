<template>
    <div class="chracters">
        <h2 class="info-section-title">Character Posters</h2>
        <div class="characters__list">
            <div class="character" v-for="(character, index) in postersList" :key="index">
                <img :src="character" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'FilmCaracters',
        props: ['poster', 'characters'],
        computed: {
            postersList() {
                let posters = [];
                let path = `images/posters/characters/${this.poster}/`;
                for(let i = 1; i < this.characters; i++) {
                    posters.push(path + i + '.webp');
                }
                return posters;
            }
        }
    }
</script>
<style>
    .characters__list {
        display: flex;
        gap: 20px;
        padding: 10px 0;
        overflow: auto;
    }
    .character {
        width: 180px;
        flex-shrink: 0;
    }
    .character img {
        width: 100%;
    }
</style>