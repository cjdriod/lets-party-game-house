export default [
  {
    path: '/',
    component: () => import('./components/Home'),
    name: 'LandingPage',
    meta: {
      dashboardMenu: {
        title: 'Home',
        icon: 'mdi-home',
      },
      themeColor: {
        primary: '#FFF4D8',
      },
      fullMWidthLayout: true,
      showLegalFooter: true,
    },
  },
]
