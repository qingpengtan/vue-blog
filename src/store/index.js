import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import nav from './modules/nav'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {app,nav},
  getters
})
