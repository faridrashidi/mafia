<template>
  <div class="table">
    <table
      :class="{
        safemode: gameSettings.safemode
      }"
    >
      <tbody>
        <tr v-for="(tD, index) in tableData" :key="index" :class="characterClasses(tD)">
          <td
            :class="{
              'killer-role': tD.ability.killer && !tD.status.dead
            }"
          >
            <img :src="getImg('/roles', tD.icon)" :alt="tD.info[currentLang].name" />
            <span>
              {{ tD.info[currentLang].name }}
            </span>
            <span v-if="tD.lastRoleInfo">
              {{ `(${tD.lastRoleInfo[currentLang].name || ""})` }}
            </span>
            <img
              v-if="tD.ability.killer && !tD.status.dead"
              src="@/assets/images/icons/killer.svg"
              alt="Killer Icon"
              class="killer-icon"
              :title="$t('common.killCapacity')"
            />
            <img
              v-if="tD.status.realGun"
              src="@/assets/images/icons/kill.svg"
              alt="Real Gun Icon"
              class="gun-icon"
              :title="$t('god.realGun')"
            />
            <img
              v-if="tD.status.fakeGun"
              src="@/assets/images/icons/fakegun.svg"
              alt="Fake Gun Icon"
              class="gun-icon"
              :title="$t('god.fakeGun')"
            />
          </td>
          <template v-if="dashboardTable">
            <td>
              <span class="character-player">
                {{ tD.player }}
              </span>
            </td>
            <td>
              <a
                href="javascript:void(0)"
                :class="{
                  killer: !tD.status.dead,
                  angel: tD.status.dead
                }"
                @click="godAction(tD)"
              />
            </td>
            <td v-if="!dashboard.day">
              <span
                v-if="!tD.status.hasPassive && !tD.status.hasAction && !tD.hasDoneAction"
                class="disabled"
              />
              <span v-if="tD.status.hasPassive && !tD.status.hasAction" class="passive" />
              <span
                v-else
                :class="{
                  'pending-action':
                    (!tD.hasDoneAction && tD.status.hasAction) ||
                    (!tD.hasDoneAction && tD.status.hasAction),
                  'done-action': tD.hasDoneAction
                }"
              />
            </td>
          </template>
          <template v-else>
            <td>
              <CharacterPower :mafia="tD.mafia" :solo="tD.solo" :power="tD.power" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CharacterPower from "@/components/CharacterPower.vue";

export default {
  name: "Table",
  components: {
    CharacterPower
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    dashboardTable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    characterClasses(char) {
      let output = {};
      if (this.dashboardTable) {
        output = {
          dead: char.status.dead,
          heal: char.status.heal,
          ninja: char.status.roleReplaced,
          "love-bind": char.status.link,
          freemason: char.status.freemason,
          silence: char.status.silence,
          shield: char.status.shield && !char.status.hack,
          invisible: char.status.fakeIdentity && !char.status.hack,
          "in-jail": char.status.inJail || char.status.busted,
          hack: char.status.hack,
          skeleton: char.status.minion,
          solo: char.solo
        };
      } else {
        output = {
          solo: char.solo
        };
      }
      return output;
    },
    selectThis(event) {
      event.target.setSelectionRange(0, 2);
    },
    updateVotes(vote, id) {
      this.gameSettings.selectedRoles.forEach(role => {
        if (role.id === id) {
          role.vote = vote;
        }
      });
      this.SetGameSettings(this.gameSettings);
    },
    writeToHumanReadableFile(variable, fileName) {
      let content = "";
      if (typeof variable === "string") {
        content = variable;
      } else if (typeof variable === "number" || typeof variable === "boolean") {
        content = variable.toString();
      } else if (Array.isArray(variable)) {
        content = variable.map(item => item.info.fa.name).join("\n");
      } else {
        content = "Unsupported variable type. Only strings and arrays are supported.";
      }
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    },
    godAction2(target) {
      let godActionText = "";
      let godActionImage = "";
      if (target.status.dead) {
        this.resurrect(target.player);
        godActionText = `<span>${this.$t("god.godRevive")}</span> <strong>${
          target.player
        }</strong>`;
        godActionImage = `${this.$t("god.godReviveIcon")}`;
      } else {
        this.kill(target.player, "straight");
        godActionText = `<span>${this.$t("god.godKill")}</span> <strong>${target.player}</strong>`;
        godActionImage = `${this.$t("god.godKillIcon")}`;
      }
      // TODO:
      // const index = this.tableData.findIndex(item => item.id === target.id);
      // this.tableData.splice(index, 1);
      // this.tableData.push(target);
      // this.writeToHumanReadableFile(this.tableData, "/Users/farid/Desktop/salam.txt");
      this.saveHistory(godActionImage, godActionText);
      this.SetGameSettings(this.gameSettings);
      this.SetDashboard(this.dashboard);
    },
    moveRowToEnd(index) {
      const row = this.tableData.splice(index, 1)[0];
      this.tableData.push(row);
      // this.writeToHumanReadableFile(this.tableData, "/Users/farid/Desktop/salam.txt");
    }
  }
};
</script>
