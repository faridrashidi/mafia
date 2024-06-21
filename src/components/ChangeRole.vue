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
      <div>
        <label for="first_target">
          <span>
            {{ $t("god.changeRole.target1") }}
          </span>
        </label>
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
      </div>
      <div class="has-small-top-margin">
        <label for="first_target">
          <span>
            {{ $t("god.changeRole.target2") }}
          </span>
        </label>
        <select v-model="secondTarget" name="first_target" class="has-xsmall-top-margin">
          <option :value="null" disabled>
            {{ $t("god.selectPlaceholder") }}
          </option>
          <option
            v-for="(person, index) in checkGroupToSelectTarget()"
            :key="index"
            :value="person.player"
          >
            {{ `${person.info[currentLang].name}` }}
          </option>
        </select>
      </div>
    </div>
    <BaseButton class="yellow has-small-top-margin" @clicked="executeChangeRole()">
      <span>
        {{ $t("god.faceOff") }}
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
