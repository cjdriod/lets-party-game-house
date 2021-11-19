export default [
  {
    path: '/',
    component: () => import('./components/Home'),
    name: 'LandingPage',
    meta: {
      dashboardMenu: {
        name: 'Home',
        icon: 'mdi-home',
      },
      themeColor: {
        primary: '#FFF4D8',
      },
    },
  },
]
