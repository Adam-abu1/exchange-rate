import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        calculatedValue: 0,
        baseCurrency: 'EUR',
        baseRates: []
    },

    mutations: {
        setCalculatedValue(state, value) {
            state.calculatedValue = value;
        },

        setBaseCurrency(state, value) {
            state.baseCurrency = value;
        },

        setBaseRates(state, value) {
            state.baseRates = value;
        }
    },

    actions: {
        dispatchExchangeValue({commit}, payload) {
            commit('setCalculatedValue', payload);
        },

        dispatchBaseCurrency({commit}, payload) {
            commit('setBaseCurrency', payload);
        },

        dispatchBaseRates({commit}, payload) {
            commit('setBaseRates', payload);
        }
    },

    modules: {}
})
