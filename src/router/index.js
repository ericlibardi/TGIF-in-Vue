import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/senate',
    name: 'Congress Senate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CongressSenate.vue')
  },
  {
    path: '/house',
    name: 'Congress House',
    component: () => import(  '../views/CongressHouse.vue')
  },
  {
    path: '/attendancesenate',
    name: 'Attendance Senate',
    component: () => import(  '../views/AttendanceSenate.vue')
  },
  {
    path: '/attendancehouse',
    name: 'Attendance House',
    component: () => import(  '../views/AttendanceHouse.vue')
  },
  {
    path: '/loyaltysenate',
    name: 'Loyalty Senate',
    component: () => import(  '../views/LoyaltySenate.vue')
  },
  {
    path: '/loyaltyhouse',
    name: 'Loyalty House',
    component: () => import(  '../views/LoyaltyHouse.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
