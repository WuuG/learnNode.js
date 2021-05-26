import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarState: false,
  },
  mutations: {
    collapseSidebar(state) {
      state.sidebarState = !state.sidebarState
    }
  },
  actions: {
  },
  modules: {
  }
})
