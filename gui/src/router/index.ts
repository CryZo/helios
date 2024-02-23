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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
