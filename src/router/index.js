import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {path:'/welcome'},
      name:Home,
      component: Home,
      children:[
        {
          path:'welcome',
          name:'Welcome',
          component:Welcome
        }
      ]

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
