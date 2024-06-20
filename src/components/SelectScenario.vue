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
      // TODO: add more scenarios
      const scenarios = [
        "بازپرس",
        "تکاور",
        "مذاکره",
        "نماینده",
        "فیلیمو",
        "پدرخوانده",
        "زودیاک",
        "میتیک",
        "دربار",
        "ارتش سری",
        "ضد",
        "گرگ",
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
      this.gameSettings.scenario = this.selectSenario;
      this.SetGameSettings(this.gameSettings);
    }
  }
};
</script>
