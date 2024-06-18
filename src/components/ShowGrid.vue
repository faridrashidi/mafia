<template>
  <div class="show-box" style="display: flex; justify-content: center;">
    <!-- <p v-if="!showrole">
      {{ $t("pages.home.passMobile") }}
    </p> -->
    <table v-if="!showrole" style="border-collapse: collapse;width: 100%;">
      <strong>
        {{ roles[personNumber - 1].player }}
      </strong>
      <tr
        v-for="row in rows"
        :key="row"
        style="display: flex; justify-content: space-between;flex-wrap: wrap;"
      >
        <td v-for="button in buttons[row - 1]" :key="button.id" style="flex: 1 1 auto;">
          <BaseButton
            class="mask-bttn"
            key="showButton"
            :class="{ selected: button.disabled }"
            :disabled="button.disabled"
            @clicked="selectButton(button)"
          />
        </td>
      </tr>
    </table>

    <div class="player-display" v-if="selectedButton">
      <strong
        :class="
          showrole
            ? {
                'mafia-color': selectedButton.role.mafia,
                'solo-color': !selectedButton.role.mafia && selectedButton.role.solo,
                'citizen-color': !selectedButton.role.mafia && !selectedButton.role.solo
              }
            : ''
        "
      >
        {{ selectedButton.role.player }}
      </strong>
      <transition name="fade" mode="out-in">
        <div class="role-info-wrapper">
          <div
            class="role-info"
            :class="{
              solo: !selectedButton.role.mafia && selectedButton.role.solo,
              citizen: !selectedButton.role.mafia && !selectedButton.role.solo
            }"
          >
            <img
              :src="getImg('/roles', selectedButton.role.icon)"
              :alt="selectedButton.role.info[currentLang].name"
            />
          </div>
          <BaseButton class="awesome" @clicked.once="nextPerson()">
            {{ $t("pages.home.afterShowButton") }}
          </BaseButton>
          <BaseButton
            v-if="gameSettings.discordChannel"
            class="discord-bttn purple"
            @clicked="copyToClipboard(role)"
          >
            <span>
              {{ $t("common.copyToClipboard") }}
            </span>
            <input
              type="hidden"
              :value="selectedButton.role.emoji + ' ' + selectedButton.role.info[currentLang].name"
              ref="copyToDiscord"
            />
          </BaseButton>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBox",
  data() {
    return {
      showrole: false,
      personNumber: 1,
      buttons: [],
      rows: 0,
      selectedButton: null,
      roles: []
    };
  },
  mounted() {
    this.generateButtons();
  },
  methods: {
    generateButtons() {
      this.roles = JSON.parse(JSON.stringify(this.gameSettings.selectedRoles));
      const n = this.gameSettings.totalPlayers;
      let nInEeachRow = 4;
      if (n > 24) {
        nInEeachRow = 5;
      }
      this.rows = Math.ceil(n / nInEeachRow);
      let buttonId = 1;
      for (let i = 0; i < this.rows; i++) {
        const row = [];
        for (let j = 0; j < nInEeachRow; j++) {
          if (buttonId <= n) {
            row.push({
              id: buttonId,
              role: this.gameSettings.selectedRoles[buttonId - 1],
              label: `Button ${buttonId}`,
              disabled: false
            });
            buttonId++;
          }
        }
        this.buttons.push(row);
      }
    },
    selectButton(button) {
      if (!button.disabled) {
        this.selectedButton = button;
        this.gameSettings.selectedRoles[this.selectedButton.id - 1] = this.roles[
          this.personNumber - 1
        ];
        this.selectedButton.role = this.gameSettings.selectedRoles[this.selectedButton.id - 1];
        this.toggleShowRole(true);
        this.selectedButton.disabled = true;
      }
    },
    nextPerson() {
      this.toggleShowRole(false);
      if (this.selectedButton) {
        this.selectedButton = null;
      }
      if (this.personNumber == this.gameSettings.totalPlayers) {
        let roles = JSON.parse(JSON.stringify(this.gameSettings.selectedRoles));
        this.gameSettings.selectedRoles = roles.sort(function(a, b) {
          if (a.solo !== b.solo) {
            return a.solo ? -1 : 1;
          }
          if (a.mafia !== b.mafia) {
            return a.mafia ? -1 : 1;
          }
          return a.id - b.id;
        });
        this.gameSettings.stepCounter = 3;
        this.SetGameSettings(this.gameSettings);
        // Post Start Game By God To Discord
        const text = this.$t("thirdparty.discordGodGameStarted");
        this.postDiscord(text);
      } else {
        this.personNumber++;
      }
    },
    copyToClipboard(role) {
      const container = this.$refs.copyToDiscord;
      let text = container[0].value;
      if (this.gameSettings.mafia > 1 && role.mafia && !role.status.traitor && !role.status.drunk) {
        text += `

🕵️‍♀️🕵️‍♂️ ${this.$t("thirdparty.discordMafiaTeam")}`;
        this.gameSettings.selectedRoles.forEach(role => {
          if (role.player !== role.player && role.mafia && !role.status.traitor) {
            text += `${role.player} • `;
          }
        });
      }
      this.$copyText(text);
    },
    toggleShowRole(value) {
      this.showrole = value;
    }
  }
};
</script>
