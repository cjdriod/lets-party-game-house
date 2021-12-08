<template>
  <div>
    <div class="mb-16">
      <h2 class="title mb-5">Party List</h2>
      <player-list-form v-model="playerList" />
    </div>

    <div class="elf-img-background d-none" />

    <v-bottom-navigation fixed>
      <v-btn app block color="light-green accent-2" :disabled="getActivePlayer < minPlayerQty">
        <div class="title black--text">
          <span v-show="getActivePlayer < minPlayerQty">
            Waiting for {{ minPlayerQty - getActivePlayer }} player...
          </span>
          <span v-show="getActivePlayer >= minPlayerQty">Start Game ({{ getActivePlayer }})</span>
        </div>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import PlayerListForm from '@/app/whoIsMySanta/wizard/components/blocks/PlayerListForm'
export default {
  name: 'SantaLobby',
  components: { PlayerListForm },
  data() {
    return {
      minPlayerQty: 3,
      playerList: [null, null, null],
    }
  },
  computed: {
    getActivePlayer() {
      return this.playerList.filter((player) => player && player.trim() !== '').length
    },
  },
}
</script>
