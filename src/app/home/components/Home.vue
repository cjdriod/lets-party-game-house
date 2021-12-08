<template>
  <div>
    <HeroPage class="mb-9 text-center" :recommended-app="recommendedApp" />

    <div id="application" class="red lighten-5 row py-5 rounded-t-xl mb-9">
      <ApplicationList class="col-12" :applicationList="getApplicationList" />
    </div>

    <div class="mb-8">
      <ApplicationFeedback />
    </div>
  </div>
</template>

<script>
import HeroPage from '@/app/home/components/blocks/HeroPage'
import ApplicationList from '@/app/home/components/blocks/ApplicationList'
import ApplicationFeedback from '@/app/home/components/blocks/ApplicationFeedback'
import { WHO_IS_MY_SANTA } from '@/config/url-prefix'

export default {
  name: 'Home',
  components: { ApplicationFeedback, ApplicationList, HeroPage },
  computed: {
    getApplicationList() {
      return this.$router.options.routes.filter((route) => route.meta && route.meta.applicationDetails)
    },
    recommendedApp() {
      return this.getApplicationList.find((app) => app.path === WHO_IS_MY_SANTA)
    },
  },
}
</script>
