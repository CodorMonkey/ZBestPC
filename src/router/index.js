import Router from 'vue-router'
import Vue from 'vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})