import { LEGAL_COC, LEGAL_HOME, LEGAL_MIT, LEGAL_PNP } from '@/config/url-prefix'

export default [
  {
    path: LEGAL_HOME,
    component: () => import('./components/LegalHome'),
    redirect: { name: 'MitLicense' },
    children: [
      {
        path: LEGAL_MIT,
        name: 'MitLicense',
        component: () => import('./components/mit/MitLicense'),
        meta: {
          title: 'MIT License',
        },
      },
      {
        path: LEGAL_COC,
        name: 'CodeOfConduct',
        component: () => import('./components/coc/CodeOfConduct'),
        meta: {
          title: 'Code of Conduct',
          pageTitle: 'Contributor Covenant Code of Conduct',
        },
      },
      {
        path: LEGAL_PNP,
        name: 'PrivacyPolicy',
        component: () => import('./components/pnp/PrivacyPolicy'),
        meta: {
          title: 'Privacy Policy',
        },
      },
    ],
  },
]
