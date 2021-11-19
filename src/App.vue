<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="white" >
      <v-app-bar-nav-icon @click="toggleAppDrawer" />
      <v-toolbar-title>Let's Party</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="isOpenAppDrawer">
      <div class="px-3">
        <h1 class="text-h2 my-5 mb-7">Let's Party</h1>
        <div>
          <span>Created by</span>
          <v-btn
            link
            plain
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
              <v-icon>mdi-google-controller</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-divider />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Config from '@/Config'
export default {
  name: 'App',

  data() {
    return {
      authorMeta: Config.creatorDetails,
      isOpenAppDrawer: true,
    }
  },
  computed: {
    getDashboardMenuRouteLink() {
      return this.$router.options.routes.map((route) => ({
        title: (route.meta && route.meta.dashboardMenu && route.meta.dashboardMenu.name) || 'dummy',
        uri: route.path,
      }))
    },
  },

  mounted() {
    console.log(this.authorMeta)
  },

  methods: {
    toggleAppDrawer() {
      this.isOpenAppDrawer = !this.isOpenAppDrawer
    },
  },
}
</script>
