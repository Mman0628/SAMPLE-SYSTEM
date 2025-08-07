import { createStore } from 'vuex'

export default createStore({
  state: {
    count:0
  },
  getters: {

  },
  mutations: {
    countNum(state){
      state.count++ 
    }
  },
  actions: {
  },
  modules: {
  }
})
