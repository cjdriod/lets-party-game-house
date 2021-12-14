<template>
  <div>
    <div class="mb-16">
      <h2 class="title mb-5">Party List</h2>
      <player-list-form v-model="playerList" min-input="3" ref="player-list" />
    </div>

    <div class="elf-img-background d-none" />

    <v-bottom-navigation fixed>
      <v-btn app block color="light-green accent-2" :disabled="!hasMinimumPlayerInGame" @click="validateAndProceed">
        <div class="title black--text">
          <span v-show="!hasMinimumPlayerInGame"> Waiting for {{ minPlayerQty - getActivePlayer }} player... </span>
          <span v-show="hasMinimumPlayerInGame">Start Game ({{ getActivePlayer }})</span>
        </div>
      </v-btn>
    </v-bottom-navigation>

    <presentation-type-selection-modal
      :show="showPresentationModal"
      :options="getAvailablePresentationStyles"
      :action-callback="selectPresentationStyle"
      @dismiss="togglePresentationStyleModal"
    />
  </div>
</template>

<script>
import AppConfig from '../config'
import PlayerListForm from '@/app/whoIsMySanta/wizard/components/blocks/PlayerListForm'
import PresentationTypeSelectionModal from '@/app/whoIsMySanta/wizard/components/elements/PresentationTypeSelectionModal'

export default {
  name: 'SantaLobby',
  $_veeValidate: {
    validator: 'new',
  },
  components: { PresentationTypeSelectionModal, PlayerListForm },
  data() {
    return {
      showPresentationModal: false,
      playerList: [null, null, null],
      minPlayerQty: AppConfig.minPlayerQty,
    }
  },
  computed: {
    getActivePlayer() {
      return this.playerList.filter((player) => player && player.trim() !== '').length
    },
    hasMinimumPlayerInGame() {
      return this.getActivePlayer >= this.minPlayerQty
    },
    getAvailablePresentationStyles() {
      return AppConfig.presentationStyles.filter(
        (style) => style.maxPlayer === undefined || style.maxPlayer >= this.getActivePlayer
      )
    },
  },
  methods: {
    togglePresentationStyleModal() {
      this.showPresentationModal = !this.showPresentationModal
    },
    validateAndProceed() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const isAllUniquePlayers = new Set(this.playerList).size === this.getActivePlayer
          const formValidation = this.$refs['player-list'].identifyDuplicatePlayerNames
          typeof formValidation === 'function' && formValidation()

          if (this.hasMinimumPlayerInGame && isAllUniquePlayers) {
            if (this.getAvailablePresentationStyles.length > 1) {
              this.togglePresentationStyleModal()
            } else {
              const mode = AppConfig.presentationStyles.find((style) => style.default).value || ''
              this.$router.push({ query: { mode } })
            }
          }
        } else if (this.errors.items.length > 0) {
          document
            .getElementsByName(this.errors.items[0].field)[0]
            .scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    },
    selectPresentationStyle(selection) {
      this.togglePresentationStyleModal()
      this.$router.push({ query: { mode: selection.value } })
    },
  },
}
</script>
