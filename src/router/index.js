import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const requireComponent = require.context(
  '../app', // where to look for files
  true, // look sub directories
  /router.js$/ // regex criteria
)

let routes = []

requireComponent.keys().forEach((fileName) => {
  const newRoutes = requireComponent(fileName).default
  routes = [...routes, ...newRoutes]
})
routes = [
  ...routes,
  { path: '*', redirect: { name: '404' } },
  { path: '/404', name: '404', component: () => import('@/views/404') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth' }
  },
})

export default router
