<template>
  <Overlay class="final-cards">
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
      faceOffChallengeActivated: false,
      cards: new Map([
        [
          "پدرخوانده",
          [
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
              id: "handcuff",
              name: this.$t("god.gameCards.handcuff.name"),
              description: this.$t("god.gameCards.handcuff.description"),
              icon: "handcuff.svg"
            },
            {
              id: "speechless",
              name: this.$t("god.gameCards.speechless.name"),
              description: this.$t("god.gameCards.speechless.description"),
              icon: "speechless.svg"
            }
          ]
        ],
        [
          "فیلیمو",
          [
            {
              id: "lie",
              name: this.$t("god.gameCards.lie.name"),
              description: this.$t("god.gameCards.lie.description"),
              icon: "lie.svg"
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
              id: "mindRead",
              name: this.$t("god.gameCards.mindRead.name"),
              description: this.$t("god.gameCards.mindRead.description"),
              icon: "mindRead.svg"
            }
          ]
        ]
      ])
    };
  },
  computed: {
    gameCards() {
      // NOTE: add last card
      if (this.cards.has(this.gameSettings.scenario)) {
        const output = this.cards.get(this.gameSettings.scenario);
        output.sort(() => 0.5 - Math.random());
        return output;
      } else {
        const output = [];
        return output;
      }
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
