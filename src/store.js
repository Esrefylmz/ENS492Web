import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    authenticated: false,
    permissions: []
}
  
const mutations = {
    setAuthenticated (state, value) {
        state.authenticated = value
    },

    setPermissions (state, value) {
        state.permissions = value
    }
}

const actions = {
    login ({ commit }, credentials) {
      // Perform authentication here
      // Set authenticated to true if successful
      const authenticated = true
      const permissions = ['permission1', 'permission2'] // Example permissions
  
      commit('setAuthenticated', authenticated)
      commit('setPermissions', permissions)
    }
  }
  
  export default new Vuex.Store({
    state,
    mutations,
    actions
  })
  