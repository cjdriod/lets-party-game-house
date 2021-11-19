<template>
  <div>
    <h2 class="text-capitalize text-h4 mb-9 text-center">Mini-game and tools</h2>

    <v-row>
      <v-col
        v-bind="appCardWrapperProps"
        :key="`available-${index}`"
        v-for="(app, index) in getApplicationOptions.available"
      >
        <ApplicationCard :application-details="app" />
      </v-col>

      <template v-if="getApplicationOptions.comingSoon.length">
        <v-col cols="12" class="mt-6">
          <div class="text-capitalize text-center title grey--text">Coming soon</div>
          <v-divider />
        </v-col>

        <v-col
          v-bind="appCardWrapperProps"
          :key="`coming-soon-${index}`"
          v-for="(app, index) in getApplicationOptions.comingSoon"
        >
          <ApplicationCard :application-details="app" />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import ApplicationCard from '@/app/home/components/elements/ApplicationCard'
export default {
  name: 'ApplicationList',
  components: { ApplicationCard },
  computed: {
    getApplicationOptions() {
      const application = [
        {
          title: 'Who is my santa',
          description: 'A modern Christmas game - Randomly pair up players for festive gift exchange activity.',
          type: 'Mini-Game',
          link: {},
        },
        {
          title: 'My Secret Angle',
          description:
            'A team bonding game - Matched up with players secretly, the "angle" have to take care it own target for certain period without getting noticed.',
          type: 'Mini-Game',
          link: '',
        },
        {
          title: 'Who is my Team',
          description: 'Group formation tool - Randomly group up team members based on group capacity.',
          type: 'Tool',
          link: '',
        },
      ]

      return {
        available: application.filter((app) => app.link),
        comingSoon: application.filter((app) => !app.link),
      }
    },
  },
  data() {
    return {
      appCardWrapperProps: { cols: 12, sm: 6, lg: 4, xl: 3, class: 'd-flex align-stretch' },
    }
  },
}
</script>
