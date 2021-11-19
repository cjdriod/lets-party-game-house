<template>
  <div>
    <HeroPage class="mb-9 text-center" />

    <div id="application" class="red lighten-5 row py-5 rounded-t-xl mb-9">
      <ApplicationList class="col-12" />
    </div>

    <div class="mb-9">
      <ApplicationFeedback />
    </div>
  </div>
</template>

<script>
import HeroPage from '@/app/home/components/blocks/HeroPage'
import ApplicationList from '@/app/home/components/blocks/ApplicationList'
import ApplicationFeedback from '@/app/home/components/blocks/ApplicationFeedback'

export default {
  name: 'Home',
  components: { ApplicationFeedback, ApplicationList, HeroPage },
}
</script>
