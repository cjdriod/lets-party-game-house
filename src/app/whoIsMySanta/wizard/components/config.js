import Config from '@/config'

export default {
  minPlayerQty: 3,
  presentationStyles: [
    {
      title: 'Card view',
      description: `Display paired players' name 1 by 1`,
      icon: 'mdi-cards',
      value: 'card',
      maxPlayer: Config.santaApp.cardPresentationMaxPlayer, // only below or equal to qty player able to select
    },
    {
      title: 'Summary view',
      description: `Display all paired players' name in table listing way`,
      icon: 'mdi-table',
      value: 'summary',
      default: true,
    },
  ],
}
