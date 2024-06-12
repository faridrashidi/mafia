<template>
  <Overlay class="final-cards">
    <p>
      کارت‌های حرکت آخر شامل: تغییرچهره، فرش‌قرمز، مسیرسبز، سرگیجه، ذهن‌زیبا، سکوت‌بره‌ها، سرگیجه،
      بی‌خوابی، شلیک‌نهایی و افشای‌هویت
    </p>
    <p>
      می‌تونی به فرد خارج‌شده بگی یکی از گزینه‌های زیر رو انتخاب کنه حال بسته به کارت‌هایی که مد نظر
      داری خودت تصمیم بگیر کارت انتخابی اعمال می‌شه یا باید یک کارت دیگه انتخاب کنه
    </p>
    <div class="card-holder">
      <GameCard
        v-for="(gameCard, index) in gameCards"
        :key="index"
        :id="gameCard.id"
        :icon="gameCard.icon"
        :name="gameCard.name"
        :description="gameCard.description"
        @faceOff="openFaceOffChallenge"
      />
    </div>
    <BaseButton class="white has-small-top-margin" @clicked="closeLog()">
      <span>
        {{ $t("common.Close") }}
      </span>
    </BaseButton>
    <FaceOffChallenge
      :class="{
        active: faceOffChallengeActivated
      }"
      @close="hideFaceOff"
    />
  </Overlay>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import FaceOffChallenge from "@/components/FaceOffChallenge.vue";

export default {
  name: "FinalCards",
  components: {
    GameCard,
    FaceOffChallenge
  },
  data() {
    return {
      faceOffChallengeActivated: false
    };
  },
  computed: {
    gameCards() {
      // TODO: based on scenario
      const output = [
        {
          id: "faceOff",
          name: this.$t("god.gameCards.faceOff.name"),
          description: this.$t("god.gameCards.faceOff.description"),
          icon: "faceOff.svg"
        },
        {
          id: "mindRead",
          name: this.$t("god.gameCards.mindRead.name"),
          description: this.$t("god.gameCards.mindRead.description"),
          icon: "mindRead.svg"
        },
        {
          id: "showIdentity",
          name: this.$t("god.gameCards.showIdentity.name"),
          description: this.$t("god.gameCards.showIdentity.description"),
          icon: "showIdentity.svg"
        },
        {
          id: "judgeDay",
          name: this.$t("god.gameCards.judgeDay.name"),
          description: this.$t("god.gameCards.judgeDay.description"),
          icon: "judgeDay.svg"
        },
        {
          id: "headCount",
          name: this.$t("god.gameCards.headCount.name"),
          description: this.$t("god.gameCards.headCount.description"),
          icon: "headCount.svg"
        },
        {
          id: "shot",
          name: this.$t("god.gameCards.shot.name"),
          description: this.$t("god.gameCards.shot.description"),
          icon: "shot.svg"
        },
        {
          id: "sleepless",
          name: this.$t("god.gameCards.sleepless.name"),
          description: this.$t("god.gameCards.sleepless.description"),
          icon: "sleepless.svg"
        },
        {
          id: "redCarpet",
          name: this.$t("god.gameCards.redCarpet.name"),
          description: this.$t("god.gameCards.redCarpet.description"),
          icon: "redCarpet.svg"
        },
        {
          id: "greenLine",
          name: this.$t("god.gameCards.greenLine.name"),
          description: this.$t("god.gameCards.greenLine.description"),
          icon: "greenLine.svg"
        },
        {
          id: "lie",
          name: this.$t("god.gameCards.lie.name"),
          description: this.$t("god.gameCards.lie.description"),
          icon: "lie.svg"
        }
        // {
        //   id: "exhumation",
        //   name: this.$t("god.gameCards.exhumation.name"),
        //   description: this.$t("god.gameCards.exhumation.description"),
        //   icon: "exhumation.svg"
        // },
        // {
        //   id: "luckyDay",
        //   name: this.$t("god.gameCards.luckyDay.name"),
        //   description: this.$t("god.gameCards.luckyDay.description"),
        //   icon: "luckyDay.svg"
        // },
        // {
        //   id: "will",
        //   name: this.$t("god.gameCards.will.name"),
        //   description: this.$t("god.gameCards.will.description"),
        //   icon: "will.svg"
        // },
        // {
        //   id: "gamble",
        //   name: this.$t("god.gameCards.gamble.name"),
        //   description: this.$t("god.gameCards.gamble.description"),
        //   icon: "gamble.svg"
        // },
      ];
      output.sort(() => 0.5 - Math.random());
      return output;
    }
  },
  methods: {
    closeLog() {
      this.$emit("close", "cards");
    },
    openFaceOffChallenge() {
      this.faceOffChallengeActivated = true;
    },
    hideFaceOff() {
      this.faceOffChallengeActivated = false;
    }
  }
};
</script>
