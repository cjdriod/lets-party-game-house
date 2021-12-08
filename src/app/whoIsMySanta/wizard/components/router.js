import { WHO_IS_MY_SANTA, WHO_IS_MY_SANTA_LOBBY, WHO_IS_MY_SANTA_RESULT } from '@/config/url-prefix'

const appTitle = 'Who Is My Santa'
const commonMeta = { useAppFooter: true, appTitle }

export default [
  {
    path: WHO_IS_MY_SANTA,
    component: () => import('./GameProcessTemplate'),
    name: 'WhoIsMySantaApp',
    meta: {
      ...commonMeta,
      dashboardMenu: {
        title: appTitle,
        icon: 'mdi-google-controller',
      },
      applicationDetails: {
        title: appTitle,
        description: 'A modern Christmas game - Randomly pair up players for festive gift exchange activity.',
        type: 'Mini-Game',
        link: WHO_IS_MY_SANTA,
      },
    },
    children: [
      {
        path: WHO_IS_MY_SANTA_LOBBY,
        name: 'WhoIsMySantaLobby',
        component: () => import('./stepper/SantaLobby'),
        meta: { ...commonMeta },
      },
      {
        path: WHO_IS_MY_SANTA_RESULT,
        name: 'WhoIsMySantaResult',
        // component: () => import('./stepper/'),
        meta: { ...commonMeta },
      },
    ],
  },
]
