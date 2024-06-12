<template>
  <div class="game-settings">
    <nav>
      <button
        v-for="(setting, index) in settings"
        :key="index"
        :class="{
          active: setting.active
        }"
        @click="openSettings(setting.value, index)"
      >
        <span>
          <img :src="getImg('/icons', setting.value + '.svg')" :alt="setting.name" />
          <strong>
            {{ setting.name }}
          </strong>
        </span>
      </button>
    </nav>
    <GameCharacterWakeUp
      :class="{
        active: wakeup
      }"
      @close="closeSettings"
    />
    <!-- History Log -->
    <ChangeRole
      :class="{
        active: changeRole
      }"
      @close="closeSettings"
    />
    <!-- Game Inquiry -->
    <GameInquiry
      :show-numbers="inquiry"
      :class="{
        active: inquiry
      }"
      @close="closeSettings"
    />
    <!-- Final Cards -->
    <FinalCards
      :class="{
        active: cards
      }"
      @close="closeSettings"
    />
  </div>
</template>

<script>
import ChangeRole from "@/components/ChangeRole.vue";
import GameInquiry from "@/components/GameInquiry.vue";
import FinalCards from "@/components/FinalCards.vue";
import GameCharacterWakeUp from "@/components/GameCharacterWakeUp.vue";

export default {
  name: "GameSettings",
  components: {
    ChangeRole,
    GameInquiry,
    FinalCards,
    GameCharacterWakeUp
  },
  data() {
    return {
      safemode: false,
      inquiry: false,
      cards: false,
      wakeup: false,
      historyLog: false,
      changeRole: false,
      settings: [
        // {
        //   name: this.$t("god.gameSettings.showHistoryLog"),
        //   value: "historyLog",
        //   active: false
        // },
        // {
        //   name: this.$t('god.gameSettings.safeMode'),
        //   value: 'safemode',
        //   active: false
        // },
        {
          name: this.$t("god.gameSettings.wakeup"),
          value: "wakeup",
          active: false
        },
        {
          name: this.$t("god.gameSettings.inquiry"),
          value: "inquiry",
          active: false
        },
        {
          name: this.$t("god.gameSettings.finalMoveCards"),
          value: "cards",
          active: false
        }
        // ,
        // {
        //   name: this.$t("god.gameSettings.changeRole"),
        //   value: "changeRole",
        //   active: false
        // }
        // TODO: add change role
      ]
    };
  },
  methods: {
    openSettings(setting, index) {
      this[setting] = true;
      this.settings[index].active = !this.settings[index].active;
      if (setting === "safemode") {
        this.gameSettings.safemode = !this.gameSettings.safemode;
        this.SetGameSettings(this.gameSettings);
      }
    },
    closeSettings(setting) {
      this[setting] = false;
      let settingIndex = 0;
      this.settings.filter((item, index) => {
        if (item.value === setting) {
          settingIndex = index;
        }
      });
      this.settings[settingIndex].active = false;
    }
  }
};
</script>
