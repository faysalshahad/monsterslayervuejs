function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // Returns a random integer between min (inclusive) and max (exclusive)
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null, // To track the winner of the game
      logMessages: [], // To store battle log messages
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return {
          width: "0%",
        };
      }
      return {
        width: this.monsterHealth + "%",
      };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return {
          width: "0%",
        };
      }
      return {
        width: this.playerHealth + "%",
      };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 4 !== 0; // Allows special attack every 4th round
    },
    mayUseHeal() {
      return this.currentRound % 3 !== 0; // Allows healing every 3rd round
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // if (confirm("It's a draw! New Game?")) {
        // this.playerHealth = 100;
        // this.monsterHealth = 100;
        // this.currentRound = 0;
        //}
        this.winner = "draw"; // Set winner to draw
      } else if (value <= 0) {
        //if (confirm("You lost! New Game?")) {
        // this.playerHealth = 100;
        // this.monsterHealth = 100;
        // this.currentRound = 0;
        // }
        this.winner = "monster"; // Set winner to monster
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //if (confirm("It's a draw! New Game?")) {
        // this.playerHealth = 100;
        // this.monsterHealth = 100;
        // this.currentRound = 0;
        // }
        this.winner = "draw"; // Set winner to draw
      } else if (value <= 0) {
        //if (confirm("You won! New Game?")) {
        // this.playerHealth = 100;
        // this.monsterHealth = 100;
        // this.currentRound = 0;
        this.winner = "player"; // Set winner to player
      }
      //}
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const damage = getRandomInt(5, 15); // Random damage between 5 and 15
      this.monsterHealth -= damage;
      this.addBattleLog("Player", "attacks", damage); // Log player attack
      this.attackPlayer(); // Monster retaliates after player attacks
    },
    attackPlayer() {
      const damage = getRandomInt(9, 23); // Random damage between 9 and 20
      this.playerHealth -= damage;
      this.addBattleLog("Monster", "attacks", damage); // Log monster attack
    },
    specialAttack() {
      this.currentRound++;
      const damage = getRandomInt(15, 29); // Random damage between 15 and 27
      this.monsterHealth -= damage;
      this.addBattleLog("Player", "special_attacks", damage); // Log player special attack
      this.attackPlayer(); // Player retaliates after monster attacks
      //this.log.push(`Monster attacks Player for ${damage} damage.`);
    },
    healPlayer() {
      this.currentRound++;
      const heal = getRandomInt(15, 30); // Random heal between 15 and 30
      if (this.playerHealth + heal > 100) {
        this.playerHealth = 100; // Cap health at 100
      } else {
        this.playerHealth += heal;
        this.addBattleLog("Player", "heals", heal); // Log player healing
      }
      this.attackPlayer(); // Monster retaliates after player heals
      //this.log.push(`Player heals for ${heal} health.`);
    },
    surrender() {
      this.winner = "monster"; // Set winner to monster when player surrenders
      //this.log.push(`Player surrenders.`);
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null; // Reset winner
      this.logMessages = []; // Reset log if you have one
    },
    addBattleLog(who, what, value) {
      // If you have a log, you can implement this method to add messages to it
      // this.log.push(message);
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
