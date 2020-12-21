import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        films: [],
        list: [],
        parts: []
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
        },
        LOAD_PARTS ({ commit }) {
          fetch('database/parts.json')
            .then(response => response.json())
            .then(parts => {
            commit('SET_PARTS', parts)
            })          
        }
    },
    mutations: {
        SET_FILMS(state, films) {
            state.films = films
        },
        SET_LIST(state, list) {
            state.list = list
        },
        SET_PARTS(state, parts) {
            state.parts = parts
        }
    }
})