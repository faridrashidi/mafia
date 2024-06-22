<template>
  <Overlay class="face-off-challenge">
    <img
      :src="getImg('/icons', 'faceOff.svg')"
      :alt="$t('god.changeRole.name')"
      class="img-size-lg"
    />
    <h1>
      {{ $t("god.changeRole.name") }}
    </h1>
    <p>
      {{ $t("god.changeRole.description") }}
    </p>
    <div class="choose-players has-top-margin">
      <div class="select-numbers step-box">
        <select v-model="firstTarget" name="first_target" class="has-xsmall-top-margin">
          <option :value="null" disabled>
            {{ $t("god.changeRole.selectPlaceholder1") }}
          </option>
          <option
            v-for="(person, index) in checkGroupToSelectTarget()"
            :key="index"
            :value="person.player"
          >
            {{ person.player + ` (${person.info[currentLang].name})` }}
          </option>
        </select>
        <p style="margin-bottom: 0px;" v-html="$t('god.changeRole.target1')" />
      </div>
      <div class="select-numbers step-box">
        <select v-model="secondTarget" name="first_target" class="has-xsmall-top-margin">
          <option :value="null" disabled>
            {{ $t("god.changeRole.selectPlaceholder2") }}
          </option>
          <option
            v-for="(person, index) in checkGroupToSelectTarget()"
            :key="index"
            :value="person.player"
          >
            {{ `${person.info[currentLang].name}` }}
          </option>
        </select>
        <p style="margin-bottom: 0px;" v-html="$t('god.changeRole.target2')" />
      </div>
    </div>
    <br /><br />
    <BaseButton class="yellow has-small-top-margin" @clicked="executeChangeRole()">
      <span>
        {{ $t("god.changeRole.button") }}
      </span>
    </BaseButton>
    <BaseButton class="red has-small-top-margin" @clicked="closeChangeRole()">
      <span>
        {{ $t("common.Close") }}
      </span>
    </BaseButton>
  </Overlay>
</template>

<script>
export default {
  name: "ChangeRole",
  data() {
    return {
      firstTarget: "",
      secondTarget: ""
    };
  },
  methods: {
    executeChangeRole() {
      // NOTE: add change role option
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
        const target1Name = JSON.parse(
          JSON.stringify(this.gameSettings.selectedRoles[target1Index].player)
        );
        const target2Name = JSON.parse(
          JSON.stringify(this.gameSettings.selectedRoles[target2Index].player)
        );
        this.gameSettings.selectedRoles[target1Index] = JSON.parse(
          JSON.stringify(this.gameSettings.selectedRoles[target2Index])
        );
        this.gameSettings.selectedRoles[target1Index].player = target1Name;
        this.gameSettings.selectedRoles[target2Index].player = target2Name;
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
        this.$emit("close", "changeRole");
        this.firstTarget = "";
        this.secondTarget = "";
      }
    },
    closeChangeRole() {
      this.firstTarget = "";
      this.secondTarget = "";
      this.$emit("close", "changeRole");
    }
  }
};
</script>
