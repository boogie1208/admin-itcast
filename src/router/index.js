import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'
import User from '@/views/user/User'
import Rights from '@/views/right/Rights'
import Roles from '@/views/right/Roles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/welcome',
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/users',
          name: 'User',
          component: User
        },
        {
          name:'Rights',
          path:'/rights',
          component:Rights
        },
        {
          name:'Roles',
          path:'/roles',
          component:Roles
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
  ]
})
