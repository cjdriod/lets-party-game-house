<template>
  <div>
    <v-bottom-sheet :value="show" @click:outside="$emit('dismiss')">
      <v-list class="pb-10">
        <v-subheader>Presentation Options:</v-subheader>

        <v-list-item-group>
          <v-list-item v-for="(option, index) in presentationOptions" :key="index">
            <v-list-item-icon><v-icon v-text="option.icon" large /></v-list-item-icon>

            <v-list-item-content @click="submitAction(option)">
              <v-list-item-title v-text="option.title" class="text-capitalize" />
              <small class="grey--text">{{ option.description }}</small>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'PresentationTypeSelectionModal',
  props: {
    show: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    actionCallback: { type: Function, required: true },
  },
  data() {
    return {
      selectedOptions: null,
    }
  },
  computed: {
    presentationOptions() {
      return this.options
    },
  },
  methods: {
    submitAction(val) {
      if (typeof this.actionCallback === 'function') {
        this.actionCallback(val)
      }
    },
  },
}
</script>
