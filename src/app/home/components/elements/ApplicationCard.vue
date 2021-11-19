<template>
  <v-card hover rounded="lg" :disabled="isDisabled" class="d-flex flex-column c-auto">
    <div>
      <v-card-title class="text-capitalize flex-nowrap justify-space-between">
        <div class="text-break">{{ applicationDetails.title }}</div>
        <v-icon class="mb-auto pl-2">{{ applicationDetails.icon }}</v-icon>
      </v-card-title>
      <v-card-subtitle>{{ applicationDetails.type }}</v-card-subtitle>
      <v-card-text>{{ applicationDetails.description }}</v-card-text>
    </div>

    <v-card-actions class="justify-end mt-auto">
      <v-btn text color="primary" :to="applicationDetails.link" :disabled="isDisabled">
        <span>{{ isDisabled ? 'Coming soon' : `Let's go` }}</span>
        <v-icon>{{ isDisabled ? 'mdi-traffic-cone' : 'mdi-skateboarding' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ApplicationCard',
  props: {
    applicationDetails: { type: Object, required: true },
  },
  computed: {
    isDisabled() {
      return !this.applicationDetails.link
    },
  },
}
</script>
<style scoped>
.c-auto {
  cursor: auto !important;
}
</style>
