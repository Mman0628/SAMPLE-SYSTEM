import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'  
import TestOnly from '../components/TestOnly.vue'  
import CompanyFIles from '../components/companyFiles/CompanyFiles.vue'
import projectFiles from '../components/ProjectFiles.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/company_files',
    name: 'company_files',
    component: CompanyFIles
  },
  {
    path: '/project_files',
    name: 'project_files',
    component: projectFiles
  },
  {
    path: '/test',
    name: 'test',
    component: TestOnly
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,  
})

export default router
