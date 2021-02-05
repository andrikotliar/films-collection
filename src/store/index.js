import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        films: []
    },
    actions: {
        LOAD_FILMS ({ commit }) {
          fetch('database/database.json')
            .then(response => response.json())
            .then(films => {
            commit('SET_FILMS', films)
            })          
        }
    },
    mutations: {
        SET_FILMS(state, films) {
            state.films = films
        }
    }
})