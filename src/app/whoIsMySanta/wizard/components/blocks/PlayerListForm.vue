<template>
  <div>
    <v-form>
      <template v-for="(playerName, index) in getPlayerList">
        <v-text-field
          :key="index"
          rounded
          outlined
          :value="playerName"
          v-validate="'required'"
          :name="`player_${index + 1}`"
          :label="`player ${index + 1}`"
          hint="Player nickname must be unique"
          :data-vv-as="`player ${index + 1} nickname`"
          :error-messages="
            (errors.first(`player_${index + 1}`) && enhanceErrorMsg(index)) ||
            getErrors[`${inputFieldPrefix}_${index + 1}`]
          "
          @input="
            (val) => {
              editPlayerName(val, index)
            }
          "
          @change="
            (val) => {
              validatePlayerName(val, index)
            }
          "
        >
          <template v-slot:append>
            <v-icon
              v-show="!getRemoveActionStatus && playerName"
              v-ripple
              color="grey lighten-1"
              @click="toggleRemovePlayerDialog(index)"
            >
              mdi-account-remove-outline
            </v-icon>

            <v-icon v-show="!playerName && index >= minInput" v-ripple color="error" @click="removePlayer(index)">
              mdi-trash-can-outline
            </v-icon>
          </template>
        </v-text-field>
      </template>

      <div class="text-center">
        <v-btn x-large rounded outlined block color="primary" :disabled="!canAddNewPlayerSlot" @click="addPlayerSlot">
          <v-icon class="pr-2">mdi-account-plus-outline</v-icon>
          <span>Add a new Player</span>
        </v-btn>
      </div>
    </v-form>

    <v-dialog
      max-width="350"
      :retain-focus="false"
      :value="removePlayerDialogMeta.show"
      @click:outside="toggleRemovePlayerDialog()"
    >
      <v-card>
        <v-card-title class="mb-3">Remove Player</v-card-title>

        <v-card-subtitle>
          <span>Do you want to remove</span>
          <span class="font-weight-bold font-italic px-1">{{ getPlayerList[removePlayerDialogMeta.playerIndex] }}</span>
          <span>from the game?</span>
        </v-card-subtitle>

        <v-card-actions class="justify-end">
          <v-btn text color="error" @click="removePlayerAction">Remove Player</v-btn>
          <v-btn text @click="toggleRemovePlayerDialog()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'PlayerListForm',
  inject: ['$validator'],
  props: {
    value: { type: Array, default: () => [null] },
    minInput: { type: [Number, String], default: 0 },
  },
  data() {
    return {
      errorBag: {},
      playerList: [],
      removeStatus: false,
      inputFieldPrefix: 'player',
      showRemovePlayerDialog: false,
      removePlayerDialogMeta: { show: false, playerIndex: null },
    }
  },
  computed: {
    getRemoveActionStatus() {
      return this.removeStatus
    },
    getPlayerList() {
      return this.playerList || []
    },
    canAddNewPlayerSlot() {
      return this.playerList.every((player) => Boolean((player || '').trim()))
    },
    hasDuplicateNamePlayer() {
      return new Set(this.playerList).size !== this.playerList.length
    },
    getErrors() {
      return { ...this.errorBag }
    },
    needErrorCheck() {
      // might have addition check possibility once duplicate 1st time complete remove
      return this.hasDuplicateNamePlayer || Object.keys(this.getErrors).length > 0
    },
  },
  watch: {
    playerList: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true,
    },
    value: {
      handler(val = []) {
        if (JSON.stringify(this.playerList) !== JSON.stringify(val)) {
          this.playerList = [...val]
          this.identifyDuplicatePlayerNames()
        }
      },
      immediate: true,
    },
  },
  methods: {
    validatePlayerName(name, index) {
      const errorKey = `${this.inputFieldPrefix}_${index + 1}`
      const errors = { ...this.errorBag }

      if (this.needErrorCheck) {
        const hasDuplicate = this.getPlayerList.filter((player) => player === name).length > 1

        if (hasDuplicate) {
          errors[errorKey] = 'Player nickname must be unique'
        } else {
          delete errors[errorKey]
        }
      }

      this.errorBag = errors
    },
    identifyDuplicatePlayerNames() {
      const scanList = {}
      Object.assign([], this.getPlayerList)
        .reverse()
        .forEach((name, idx) => {
          if (name && !scanList[name]) {
            scanList[name] = name
            this.validatePlayerName(name, this.getPlayerList.length - (idx + 1))
          }
        })

      this.scrollToErrorField()
    },
    removePlayer(index) {
      this.removeStatus = true
      this.playerList.splice(index, 1)
      this.identifyDuplicatePlayerNames()
      this.removeStatus = false
    },
    editPlayerName(name, index) {
      const result = this.playerList
      result[index] = name.trim()
      this.playerList = [...result]
    },
    addPlayerSlot() {
      if (this.hasDuplicateNamePlayer) {
        alert('player name must be unique')
      } else if (this.canAddNewPlayerSlot) {
        this.playerList.push(null)
        this.$nextTick(() => {
          const element = document.getElementById('app')
          element.scrollIntoView({ behavior: 'smooth', block: 'end' })
        })
      } else {
        alert('fill up the player form 1st')
      }
    },
    toggleRemovePlayerDialog(index = null) {
      this.removePlayerDialogMeta = { show: index !== null, playerIndex: index }
    },
    removePlayerAction() {
      this.removePlayer(this.removePlayerDialogMeta.playerIndex)
      this.toggleRemovePlayerDialog()
    },
    scrollToErrorField() {
      this.$nextTick(() => {
        const firstErrorKey = Object.keys(this.getErrors)[0]
        firstErrorKey &&
          document.getElementsByName(firstErrorKey)[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    },
    enhanceErrorMsg(index) {
      return `${this.errors.first(`player_${index + 1}`)} ${
        index >= this.minInput ? '/ or click on remove icon to remove this slot' : ''
      }`
    },
  },
}
</script>
