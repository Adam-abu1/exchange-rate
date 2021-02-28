import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      calculatedValue: 0
  },
  mutations: {
      setCalculatedValue (state, value) {
        state.calculatedValue = value;
      }
  },
  actions: {
    dispatchExchangeValue({ commit }, payload) {
      commit('setCalculatedValue', payload);
    }
  },
  modules: {
  }
})
