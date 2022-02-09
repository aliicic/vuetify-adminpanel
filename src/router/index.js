import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    //name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [

        {
    path: '',
    name: 'Dashboard',
    component: Home
  },
  {
    path: 'about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: 'users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  },
      
    ]

  
  },
  {
    path: '/auth',
    //name: 'Dashboard',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    children: [
            
          {
             path: 'login',
             name: 'Login',
             component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
          }
      
    ]

  
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
