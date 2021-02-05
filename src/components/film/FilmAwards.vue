<template>
    <div class="awards" >
        <h2 class="info-section-title">Awards</h2>
        <div class="awards__list">
            <div class="award" v-for="(award, index) in awards" :key="index">
                <h3 class="award__title"> {{award.title}} </h3>
                <ul class="award__nominations">
                    <li v-for="(nomination, index) in award.nominations" :key="index"> {{nomination}} </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FilmAwards',
        props: ['awards']
    }
</script>

<style>
	.awards__list {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		margin-top: 20px;
	}

	.award {
		flex-shrink: 0;
		background-color: #f2f2f2; 
	}

	.award__title, .award__nominations li {
		padding: 5px 20px;
	}

	.award__title {
		color: #fff;
		background-color: var(--base-color);
	}
</style>