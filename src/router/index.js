import Vue from 'vue'
import VueRouter from 'vue-router'
import CompanyUsers from '../views/Companies.vue'
import Buildings from '../views/Companies.vue'
import Building from '../views/Rooms.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    //component: Register
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/devices',
    name: 'devices',
    component: () => import(/* webpackChunkName: "about" */ '../views/Devices.vue')
  },
  {
    path: '/admins',
    name: 'admins',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admins.vue')
  },
  {
    path: '/viewers',
    name: 'viewers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Viewers.vue')
  },
  {
    path: '/addbuilding',
    name: 'addbuilding',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddBuilding.vue')
  },
  {
    path: '/editbuilding',
    name: 'editbuilding',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditBuilding.vue')
  },
  {
    path: '/addroom',
    name: 'addroom',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddRoom.vue')
  },
  {
    path: '/buildings',
    name: 'buildings',
    component: Buildings
  },
  {
    path: '/addadmin',
    name: 'addadmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddAdmin.vue')
  },
  {
    path: '/buildings/:buildingName',
    name: 'building',
    component: Building
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
