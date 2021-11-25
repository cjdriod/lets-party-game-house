<template>
  <v-row class="justify-space-between align-end">
    <v-col cols="12" md="auto" class="order-1 order-md-3 py-0">
      <v-row class="text-md-right justify-md-end">
        <v-col cols="12" class="title pb-1">Legal</v-col>

        <v-col cols="auto" v-for="(route, index) in getLegalLinks" :key="index" class="pt-0">
          <v-btn plain class="px-0 text-capitalize" small :to="route.to" :ripple="false">{{ route.name }}</v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="d-md-none order-2"><v-divider /></v-col>

    <v-col cols="12" md="auto" class="order-3 order-md-1 body-2 py-0">
      <div class="mb-1">
        <span>Design and build with</span>
        <v-icon class="px-1" color="pink">mdi-heart</v-icon>
        <span>by </span>
        <v-btn v-bind="hyperLinkProps" :href="authorMeta.website" color="success">
          {{ authorMeta.name }}
        </v-btn>
      </div>

      <div class="mb-1">
        <span>All the illustration above provided by </span>
        <v-btn
          v-bind="hyperLinkProps"
          :href="illustrationProviders.link"
          nofollow
          noopener
          noreferrer
          color="blue darken-4"
        >
          {{ illustrationProviders.name }}
        </v-btn>
      </div>

      <div class="mb-1">
        <span>This website is built with</span>
        <v-btn v-bind="hyperLinkProps" :href="vueJsMeta.link" color="teal darken-1">{{ vueJsMeta.name }}</v-btn>
        <span>(Javascript progressive framework)</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Config from '@/config'
import { LEGAL_HOME } from '@/config/url-prefix'

export default {
  name: 'Footer',
  props: {
    routes: { type: Array, default: () => [] },
    showLegal: { type: Boolean, default: true }, // for future use, currently having bug with footer
  },
  data() {
    return {
      hyperLinkProps: {
        tag: 'a',
        height: 0,
        link: true,
        text: true,
        class: 'px-0',
        target: '_blank',
        rel: 'nofollow noopener noreferrer',
      },
      authorMeta: Config.creatorDetails,
      vueJsMeta: { name: 'Vue.js', link: 'https://vuejs.org/' },
      illustrationProviders: { name: 'Storyset', link: 'https://storyset.com/' },
      showLegalItems: true,
    }
  },
  computed: {
    getLegalLinks() {
      const { children: links } = { ...this.routes.find((route) => route.path === LEGAL_HOME) }
      return (links || []).map((link) => ({ name: link.meta.title, to: { name: link.name } }))
    },
  },
}
</script>
