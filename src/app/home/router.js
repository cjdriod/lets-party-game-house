export default [
  {
    path: '/',
    component: () => import('./components/home'),
    name: 'LandingPage',
    meta: {
      dashboardMenu: {
        name: 'Home',
        icon: '',
      },
    },
  },
]
