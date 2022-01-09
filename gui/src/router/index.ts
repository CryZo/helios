import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import SingleColumn from '../layouts/SingleColumn.vue'
import TwoColumn from '../layouts/TwoColumn.vue'
import TrippleColumn from '../layouts/TrippleColumn.vue'
import Rooms from '@/components/Rooms.vue';
import Room from '@/components/Room.vue';
import Devices from '@/components/Devices.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: SingleColumn,
    children: [
      {
        component: Dashboard,
        name: 'dashboard',
        path: ''
      }
    ]
  },

  {
    path: '/rooms',
    component: SingleColumn,
    children: [
      {
        component: Rooms,
        name: 'rooms',
        path: ''
      }
    ]
  },
  {
    path: '/room/:id',
    component: TwoColumn,
    children: [
      {
        components: {
          nav1: Rooms,
          default: Room
        },
        name: 'room',
        path: ''
      }
    ]
  },
  {
    path: '/room/:id/:type',
    component: TrippleColumn,
    children: [
      {
        components: {
          nav1: Rooms,
          nav2: Room,
          default: Devices
        },
        name: 'type',
        path: ''
      }
    ]
  },

  {
    path: '/charts',
    component: SingleColumn,
    children: [
      {
        component: About,
        name: 'charts',
        path: ''
      }
    ]
  },

  {
    path: '/messages',
    component: SingleColumn,
    children: [
      {
        component: About,
        name: 'messages',
        path: ''
      }
    ]
  },






  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
