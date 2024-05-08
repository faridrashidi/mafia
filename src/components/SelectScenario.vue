<template>
  <div class="select-numbers step-box">
    <p style="margin-bottom: 0px;" v-html="$t('pages.home.scenario')" />
    <select v-model.number="selectSenario" name="quantity" id="quantity" @change="calcSen">
      <option value="null" disabled>
        {{ $t("general.selectPlaceholder") }}
      </option>
      <option v-for="scenario in getScenarios" :key="scenario">
        {{ scenario }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectScenario",
  data() {
    return {
      selectSenario: ""
    };
  },
  computed: {
    getScenarios() {
      const scenarios = [
        "بازپرس",
        "تکاور",
        "مذاکره",
        "فیلیمو",
        "پدرخوانده",
        "زودیاک",
        "میتیک",
        "دربار",
        "ارتش سری",
        "ضد",
        "شب مافیا",
        "کل نقش‌ها"
      ];
      return scenarios;
    }
  },
  created() {
    this.selectSenario = this.gameSettings.scenario;
  },
  methods: {
    calcSen() {
      // this.gameSettings.selectedRoles.forEach((role) => {
      //   role.selected == false ? role.selected = true : role.selected = false
      // })
      // this.gameSettings.selectedRoles = []
      // this.gameSettings.multipleRoles =  {normalMafia: 0, normalCitizen: 0}
      // this.gameSettings.selectedMafia = 0
      // this.gameSettings.selectedCitizen = 0
      // this.gameSettings.fMafias = []
      // this.gameSettings.fCitizens = []
      // this.SetRoles(JSON.parse(JSON.stringify(this.Roles)))
      this.gameSettings.scenario = this.selectSenario;
      this.SetGameSettings(this.gameSettings);
    }
  }
};
</script>
