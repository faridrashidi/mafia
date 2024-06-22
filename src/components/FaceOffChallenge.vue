<template>
  <Overlay class="face-off-challenge">
    <img
      :src="getImg('/icons', 'faceOff.svg')"
      :alt="$t('god.gameCards.faceOff.name')"
      class="img-size-lg"
    />
    <h1>
      {{ $t("god.gameCards.faceOff.name") }}
    </h1>
    <p>
      {{ $t("god.gameCards.faceOff.description") }}
    </p>
    <div class="choose-players has-top-margin">
      <div class="select-numbers step-box">
        <select v-model="firstTarget" name="first_target" class="has-xsmall-top-margin">
          <option :value="null" disabled>
            {{ $t("god.selectPlaceholder") }}
          </option>
          <option
            v-for="(person, index) in checkGroupToSelectTarget()"
            :key="index"
            :value="person.player"
          >
            {{ person.player + ` (${person.info[currentLang].name})` }}
          </option>
        </select>
        <p style="margin-bottom: 0px;" v-html="$t('god.faceOffChallengeTarget1')" />
      </div>
      <div class="select-numbers step-box">
        <select v-model="secondTarget" name="first_target" class="has-xsmall-top-margin">
          <option :value="null" disabled>
            {{ $t("god.selectPlaceholder") }}
          </option>
          <option
            v-for="(person, index) in checkGroupToSelectTarget()"
            :key="index"
            :value="person.player"
          >
            {{ person.player + ` (${person.info[currentLang].name})` }}
          </option>
        </select>
        <p style="margin-bottom: 0px;" v-html="$t('god.faceOffChallengeTarget2')" />
      </div>
    </div>
    <br /><br />
    <BaseButton class="yellow has-small-top-margin" @clicked="executeFaceOff()">
      <span>
        {{ $t("god.faceOff") }}
      </span>
    </BaseButton>
    <BaseButton class="red has-small-top-margin" @clicked="closeFaceOff()">
      <span>
        {{ $t("common.Close") }}
      </span>
    </BaseButton>
  </Overlay>
</template>

<script>
export default {
  name: "FaceOffChallenge",
  data() {
    return {
      firstTarget: "",
      secondTarget: ""
    };
  },
  methods: {
    executeFaceOff() {
      if (this.firstTarget && this.secondTarget) {
        let target1Index = 0;
        let target2Index = 0;
        this.gameSettings.selectedRoles.forEach((role, index) => {
          if (role.player === this.firstTarget) {
            target1Index = index;
          }
          if (role.player === this.secondTarget) {
            target2Index = index;
          }
        });
        this.gameSettings.selectedRoles[target1Index].player = this.secondTarget;
        this.gameSettings.selectedRoles[target2Index].player = this.firstTarget;
        let roles = JSON.parse(JSON.stringify(this.gameSettings.selectedRoles));
        this.gameSettings.selectedRoles = roles.sort(function(a, b) {
          const aIsSpecial = a.id === 101 || a.id === 201;
          const bIsSpecial = b.id === 101 || b.id === 201;
          if (aIsSpecial && !bIsSpecial) {
            return 1;
          } else if (!aIsSpecial && bIsSpecial) {
            return -1;
          }
          if (a.solo !== b.solo) {
            return a.solo ? -1 : 1;
          }
          if (a.mafia !== b.mafia) {
            return a.mafia ? -1 : 1;
          }
          return a.id - b.id;
        });
        this.SetGameSettings(this.gameSettings);
        this.$emit("close");
        this.firstTarget = "";
        this.secondTarget = "";
      }
    },
    closeFaceOff() {
      this.firstTarget = "";
      this.secondTarget = "";
      this.$emit("close");
    }
  }
};
</script>
