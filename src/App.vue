<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="white">
      <v-app-bar-nav-icon @click="toggleAppDrawer" />
      <v-toolbar-title>{{ getAppTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="isOpenAppDrawer" app>
      <div class="px-3">
        <h1 class="text-h2 my-5 mb-7">Let's Party</h1>
        <div>
          <span>Created by</span>
          <v-btn
            link
            text
            tag="a"
            height="0"
            color="success"
            target="_blank"
            :href="authorMeta.website"
            class="px-1 text-decoration-underline"
          >
            {{ authorMeta.name }}
          </v-btn>
        </div>
      </div>

      <v-divider class="my-3" />

      <v-list shaped>
        <v-list-item-group>
          <v-list-item v-for="(route, index) in getDashboardMenuRouteLink" :key="index" :to="route.uri" color="primary">
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="grey lighten-3 text-center py-1 caption">
          <span>{{ `Version ${appVersion}` }}</span>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-divider />
      <v-container :class="[{ 'col-11': getLayoutMode !== 'full-m-width' }, 'col-lg-11', 'mt-5', 'mb-8']">
        <router-view />
      </v-container>
    </v-main>

    <v-footer v-if="!useAppFooterStatus" app inset class="py-6" absolute>
      <Footer :routes="getRoutes" :show-legal="getLegalFooterDisplayStatus" />
    </v-footer>
  </v-app>
</template>

<script>
import Config from '@/config'
import Helpers from '@/helpers'
import Footer from '@/app/_global/components/blocks/Footer'
import PackageJson from '../package.json'

export default {
  name: 'App',
  components: { Footer },
  data() {
    return {
      authorMeta: Config.creatorDetails,
      isOpenAppDrawer: true,
      appVersion: PackageJson.version,
    }
  },
  computed: {
    getRoutes() {
      return this.$router.options.routes || []
    },
    getDashboardMenuRouteLink() {
      return this.getRoutes
        .filter((route) => Helpers.getValues(route, 'meta.dashboardMenu'))
        .map((item) => ({
          title: item.meta.dashboardMenu.title || 'untitled',
          uri: item.path || '#',
          icon: item.meta.dashboardMenu.icon || 'mdi-flask',
        }))
    },
    getLayoutMode() {
      return (Helpers.getValues(this.$route, 'meta.fullMWidthLayout') && 'full-m-width') || ''
    },
    getLegalFooterDisplayStatus() {
      return Helpers.getValues(this.$route, 'meta.showLegalFooter')
    },
    useAppFooterStatus() {
      return Helpers.getValues(this.$route, 'meta.useAppFooter')
    },
    getAppTitle() {
      return Helpers.getValues(this.$route, 'meta.appTitle', `Let's Party`)
    },
  },
  methods: {
    toggleAppDrawer() {
      this.isOpenAppDrawer = !this.isOpenAppDrawer
    },
  },
}
</script>

<style lang="scss" src="./styles/main.scss"></style>
