<template>
  <v-row class="justify-space-between">
    <v-col cols="12">
      <h1>{{ getTitle }}</h1>
    </v-col>

    <v-col cols="12" lg="6" xl="9">
      <router-view />
    </v-col>

    <v-col cols="12" lg="5" xl="2">
      <v-divider class="d-lg-none mb-8" />
      <v-card outlined rounded="lg">
        <v-subheader>Additional resources</v-subheader>

        <v-list dense>
          <v-list-item v-for="(route, index) in getSuggestionLegalDoc" link :key="index" :to="route.link">
            <v-icon>mdi-file-document-outline</v-icon>
            <span class="pl-3">{{ route.title }}</span>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { LEGAL_HOME } from '@/config/url-prefix'

export default {
  name: 'LegalHome',
  mounted() {
    console.log(this.$route)
  },
  computed: {
    getTitle() {
      const { title, pageTitle } = this.$route.meta
      return pageTitle || title || ''
    },
    getLegalLinks() {
      return { ...this.$router.options.routes.find((route) => route.path === LEGAL_HOME) }.children || []
    },
    getSuggestionLegalDoc() {
      return this.getLegalLinks
        .filter((link) => link.name !== this.$route.name)
        .map((item) => ({
          title: (item.meta && item.meta.title) || '',
          link: { name: item.name },
        }))
    },
  },
}
</script>
