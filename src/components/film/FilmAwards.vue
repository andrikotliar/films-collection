<template>
    <div class="awards" >
        <h2 class="info-section-title">Awards</h2>
        <div class="awards__list">
            <div class="award" v-for="(award, index) in awards" :key="index">
            	<div class="award__header">
	                <h3 class="award__title">{{award.title}}</h3>
	                <div class="award__count">{{award.nominations.length}}</div>            		
            	</div>
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

	.award__header, .award__nominations li {
		padding: 5px 20px;
	}

	.award__header {
		color: #fff;
		background-color: var(--base-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.award__count {
		padding-left: 20px;
	}
</style>