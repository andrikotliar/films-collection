import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        films: [],
        calender: []
    },
    actions: {
        LOAD_FILMS ({ commit }) {
          fetch('database/database.json')
            .then(response => response.json())
            .then(films => {
                commit('SET_FILMS', films)
            })          
        },
        LOAD_CALENDER ({ commit }) {
            fetch('https://spreadsheets.google.com/feeds/list/1ByXhpC1xM8lOQNEB3xc3sb3uwlJrLgy7zA4PUOx52cg/od6/public/values?alt=json')
                .then(response => response.json())
                .then(calender => {
                    commit('SET_CALENDER', calender.feed.entry)
                });
        }
    },
    mutations: {
        SET_FILMS(state, films) {
            state.films = films
        },
        SET_CALENDER(state, calender) {
            state.calender = calender;
        }
    }
})