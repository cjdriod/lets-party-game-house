<template>
  <v-row>
    <v-col cols="12">
      <div class="mb-6">
        <h1 class="display-4 mb-6">Let's Party</h1>
        <div class="font-weight-regular text-h6 font-italic">
          <div>A group bonding mini-game / tools</div>
          <div>for friends and family event</div>
        </div>
      </div>

      <div v-if="monthlyRecommendation" class="mb-5">
        <div class="mb-2">- Recommendation for the month -</div>
        <v-btn color="red lighten-4" x-large rounded :to="monthlyRecommendation.link">
          {{ monthlyRecommendation.title }}
        </v-btn>
      </div>
    </v-col>

    <v-col cols="12">
      <div>
        <v-img :src="landingImage" width="400" class="mx-auto" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import LandingImage from '@/assets/img/Solidarity-pana.svg'
import Helpers from '@/helpers'

export default {
  name: 'HeroPage',
  props: {
    recommendedApp: { type: Object },
  },
  data() {
    return {
      landingImage: LandingImage,
    }
  },
  computed: {
    monthlyRecommendation() {
      return Helpers.getValues(this.recommendedApp, 'meta.applicationDetails')
    },
  },
}
</script>
