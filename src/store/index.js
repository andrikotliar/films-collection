import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        films: [],
        list: []
    },
    actions: {
        LOAD_FILMS ({ commit }) {
          fetch('database/database.json')
            .then(response => response.json())
            .then(films => {
            commit('SET_FILMS', films)
            })          
        },
        LOAD_LIST ({ commit }) {
          fetch('database/list.json')
            .then(response => response.json())
            .then(list => {
            commit('SET_LIST', list)
            })          
        }
    },
    mutations: {
        SET_FILMS(state, films) {
            state.films = films
        },
        SET_LIST(state, list) {
            state.list = list
        }
    }
})