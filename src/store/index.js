import { createStore } from 'vuex'

export default createStore({
  state: {
    company:[],
    province:[],
    city:[],
    projects: [],
    subProjects: [],
  },
  getters: {

  },
  mutations: { 
    mutateCompany(state,payload){
      state.company = payload
    },
    
    mutateProvince(state,payload){
      state.province = payload
    },

    mutateCity(state,payload){
      state.city = payload
    },

    mutateProject(state,payload){
      state.projects = payload
    },

    mutateSubProjects(state,payload){
      state.subProjects = payload
    },
  },
  actions: {

  },
  modules: {
  }
})
