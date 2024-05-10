export default {
  methods: {
    executeAction(player, targets, playerIndex, givenAbilities) {
      // Action Log
      let actionText = "";
      const actionImage = player.actionIcon;
      const checkActionFields =
        targets.length === player.status.targetNumbers || (targets.length === 0 && this.useAbility);
      if (this.useAbility) {
        actionText = `<span>${player.info[this.currentLang].action}</span> ${this.$t(
          "god.logSideText"
        )}`;
      } else {
        actionText = `<span>${
          player.info[this.currentLang].action
        }</span> ${this.$t("god.logMainText", { targets: targets.join(" - ") })}`;
      }
      this.saveHistory(actionImage, actionText);

      if (checkActionFields) {
        this.gameSettings.selectedRoles.forEach(role => {
          if (role.player === player.player) {
            role.hasDoneAction = true;
            // Boolean Ability
            if (this.useAbility) {
              if (role.ability.justice) {
                role.status.booleanAbilityUsed = true;
              }
              if (role.ability.searching) {
                role.status.booleanAbilityUsed = true;
              }
            }
          }
          // Calc Hits for Explosioner
          let isTargetSelected = false;
          targets.forEach(target => {
            if (role.player === target) {
              isTargetSelected = true;
            }
          });
          if (isTargetSelected) {
            role.status.hitByAction++;
            if (role.ability.explosioner && this.peopleInSquareNumber === role.status.hitByAction) {
              this.explosion(role.player);
              this.gameSettings.soloWinner = el;
              this.gameSettings.soloWins = true;
            }
          }
          // Ability Counter
          if (role.player === player.player && player.status.actionLimit > 0) {
            role.status.actionLimit = role.status.actionLimit - 1;
            if (role.status.actionLimit === 0) {
              role.status.hasAction = false;
            }
          }
        });
        if (!player.status.hack && targets.length > 0) {
          targets.forEach((selectedTarget, targetIndex) => {
            let target = selectedTarget;
            if (player.status.deflectAbility) {
              target = player.player;
            }
            const checkKillReturner = this.checkStatus(target, {
              returnKill: true,
              hack: false
            });
            // Kill Return if player doesnt have anti hack buff
            if (!player.status.antiHack && checkKillReturner) {
              this.returnKill(player.player, target);
            }
            // Binder
            if (player.ability.binder) {
              this.link(target);
            }
            // Deflector
            if (player.ability.deflect) {
              this.deflectAbility(target);
            }
            // Empower Ability
            if (player.ability.empower) {
              this.empowerAbility(target);
            }
            // Freemason
            if (player.ability.freemasoner) {
              this.convertToFreemason(player, target);
            }
            // Give Ability
            if (player.ability.giveAbility) {
              this.giveAbility(target, givenAbilities[targetIndex]);
            }
            // Hacker
            if (player.ability.hacker) {
              this.hack(target);
            }
            // Hack Forever
            if (player.ability.hackForever) {
              this.hackForever(target);
            }
            // Killer
            if (player.ability.killer) {
              this.kill(target, "", player);
            }
            // Identity Checker
            if (player.ability.identityChecker) {
              this.checkIdentity(target);
            }
            // Identity Changer
            if (player.ability.identityChanger) {
              this.changeIdentity(target);
            }
            // Role Checker
            if (player.ability.roleChecker) {
              this.checkRole(target);
            }
            // Replacer
            if (player.ability.replacer) {
              this.replacePlayer(target, player.player);
            }
            // Reviver
            if (player.ability.reviver) {
              this.reviveSkeletons(target);
            }
            // Resurrect
            if (player.ability.resurrect) {
              this.resurrect(target);
            }
            // Silencer
            if (player.ability.silencer) {
              this.silence(target);
            }
            // Healer
            if (player.ability.healer) {
              this.heal(target);
            }
            // Healer
            if (player.ability.antiSilencer) {
              this.antiSilence(target);
            }
            // Buster
            if (player.ability.buster) {
              this.bust(target);
            }
            // Magician
            if (player.ability.magician) {
              const dice = this.dice(4);
              if (dice === 1) {
                this.kill(target);
              } else if (dice === 2) {
                this.silence(target);
              } else if (dice === 3) {
                this.kill(player.player);
              } else if (dice === 4) {
                this.silence(player.player);
              }
            }
            // Psychic
            if (player.ability.prediction) {
              this.predict(target);
            }
          });
        }
        this.$notify({
          group: "log",
          type: "success",
          title: actionImage,
          text: actionText,
          duration: 4000
        });
        this.nextAction(playerIndex);
      } else {
        // Error Log
        this.$notify({
          group: "log",
          type: "error",
          title: "error2.svg",
          image: actionImage,
          text: `${this.$t("god.errorChoosePlayer")}`
        });
      }
    }
  }
};
