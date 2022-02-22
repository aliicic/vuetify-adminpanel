import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'
Vue.use(VueRouter)





const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  store.commit('RESET_MSG')

  next()
})

export default router
