import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    company:[],
    province:[],
    city:[],
    projects: [],
    subProjects: [],
    signatoriesData: [],
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

    mutateSignatoriesData(state,payload){
      state.signatoriesData = payload
    },
  },
  actions: {
    async updateProvince ({commit}){
      const comp = await axios.get('http://localhost:3000/myApi/company')   
      commit('mutateProvince', comp.data.province)

      return comp.data.province
    }
  },
  modules: {
  }
})
