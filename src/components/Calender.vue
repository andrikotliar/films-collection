<template>
    <div class="page container">
        <h2 class="category-title">Releases Calender</h2>
        <div class="calender">
            <div v-for="item in filteredCalender" :class="`calender__item calender__item--${item.className}`" :key="item.gsx$id.$t">
                <div class="calender__date">{{item.gsx$date.$t}}</div>
                <h3 class="calender__film">{{item.gsx$film.$t}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Calender',
        computed: {
            ...mapState(['calender']),
            filteredCalender() {
                let setCalender = [];
                let actualCalender = this.calender.filter(item => item.gsx$status.$t != 1);

                actualCalender.forEach(item => {
                    if(item.gsx$month.$t < 3 || item.gsx$month.$t > 11) {
                        item.className = 'winter';
                    } else if(item.gsx$month.$t > 2 && item.gsx$month.$t < 6) {
                        item.className = 'spring';
                    } else if(item.gsx$month.$t > 5 && item.gsx$month.$t < 9) {
                        item.className = 'summer';
                    } else {
                        item.className = 'autumn';
                    }
                });
                setCalender = actualCalender;
                return setCalender;
            }
        },
        mounted() {
            this.$store.dispatch('LOAD_CALENDER');
        }
    }
</script>
<style>
    .calender {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 5px;
        --c-border-color: #ddd;
        --c-bg-color: #f2f2f2;
    }
    .calender__item {
        height: 150px;
        padding: 10px;
        border: 4px solid var(--c-border-color);
        background: var(--c-bg-color);
    }
    .calender__item--winter {
        --c-border-color: #49a7cc;
        --c-bg-color: #80d8ff;
    }
    .calender__item--spring {
        --c-border-color: #69f0ae;
        --c-bg-color: #9fffe0;
    }
    .calender__item--summer {
        --c-border-color: #fdd835;
        --c-bg-color: #ffff6b;
    }
    .calender__item--autumn {
        --c-border-color: #ff8a65;
        --c-bg-color: #ffbb93;
    }
    .calender__film {
        margin-top: 10px;
    }
</style>