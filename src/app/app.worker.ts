/// <reference lib="webworker" />

import { IWorkerData } from './interfaces/IWorkerData';
import { IWorkerResponse } from './interfaces/IWorkerResponse';

addEventListener('message', ({ data }: { data: IWorkerData }) => {
  const player = data.player;
  const playerAttacks = data.playerAttacks;
  const monsters = data.monsters;
  const monstersAttacks = data.monstersAttacks;

  const response: IWorkerResponse = {
    playerLostLives: 0,
    playerAttacksIndexes: [],
    monstersIndexes: [],
    monstersAttacksIndexes: [],
  };

  for (let i = 0; i < playerAttacks.length; i++) {
    for (let j = 0; j < monsters.length; j++) {
      const attack = playerAttacks[i];
      const monster = monsters[j];

      if (
        attack.topInPx + attack.sizeInPx / 2 > monster.positionInPx.top &&
        attack.topInPx + attack.sizeInPx / 2 < monster.positionInPx.top + monster.sizeInPx.height &&
        attack.leftInPx + attack.sizeInPx / 2 > monster.positionInPx.left + monster.sizeInPx.width / 3 &&
        attack.leftInPx + attack.sizeInPx / 2 < monster.positionInPx.left + (monster.sizeInPx.width * 2) / 3
      ) {
        response.playerAttacksIndexes.push(i);
        response.monstersIndexes.push(j);
        break;
      }
    }
  }

  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];

    if (
      player.positionInPx.top + player.sizeInPx.height / 2 > monster.positionInPx.top + monster.sizeInPx.height / 4 &&
      player.positionInPx.top + player.sizeInPx.height / 2 <
        monster.positionInPx.top + (monster.sizeInPx.height * 3) / 4 &&
      player.positionInPx.left + player.sizeInPx.width / 2 > monster.positionInPx.left + monster.sizeInPx.width / 4 &&
      player.positionInPx.left + player.sizeInPx.width / 2 <
        monster.positionInPx.left + (monster.sizeInPx.width * 3) / 4
    ) {
      response.monstersIndexes.push(i);
      response.playerLostLives = +1;
    }

    for (let j = 0; j < monstersAttacks[i].length; j++) {
      const monsterAttack = monstersAttacks[i][j];

      if (
        monsterAttack.topInPx + monsterAttack.sizeInPx / 2 > player.positionInPx.top &&
        monsterAttack.topInPx + monsterAttack.sizeInPx / 2 < player.positionInPx.top + player.sizeInPx.height &&
        monsterAttack.leftInPx + monsterAttack.sizeInPx / 2 > player.positionInPx.left + player.sizeInPx.width / 3 &&
        monsterAttack.leftInPx + monsterAttack.sizeInPx / 2 < player.positionInPx.left + (player.sizeInPx.width * 2) / 3
      ) {
        response.monstersAttacksIndexes.push({ monsterIndex: i, attackIndex: j });
        response.playerLostLives = +1;
      }
    }
  }

  postMessage(response);
});
