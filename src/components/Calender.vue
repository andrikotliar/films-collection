<template>
    <div class="page container">
        <h2 class="category-title">Releases Calender</h2>
        <div class="calender">
            <div v-for="item in seasonCalender" :class="`calender__item calender__item--${item.className}`" :key="item.gsx$id.$t">
                <div class="calender__date">{{item.gsx$date.$t}}</div>
                <h3 class="calender__film">{{item.gsx$film.$t}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Calender',
        data() {
            return {
                calender: []
            }
        },
        methods: {
            fetchCalender() {
                fetch('https://spreadsheets.google.com/feeds/list/1ByXhpC1xM8lOQNEB3xc3sb3uwlJrLgy7zA4PUOx52cg/od6/public/values?alt=json')
                .then(response => response.json())
                .then(data => this.calender = data.feed.entry);
            }
        },
        computed: {
            seasonCalender() {
                let newArr = [];
                this.calender.forEach(item => {
                    let date = item.gsx$date.$t;
                    let subDate = date.substr(3);
                    let month = subDate.substr(-20, 2); 
                    if(month < 3 || month > 11) {
                        item.className = 'winter';
                    } else if(month > 2 && month < 6) {
                        item.className = 'spring';
                    } else if(month > 6 && month < 9) {
                        item.className = 'summer';
                    } else {
                        item.className = 'autumn';
                    }
                });
                newArr = this.calender;
                return newArr;
            }
        },
        mounted() {
            this.fetchCalender();  
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