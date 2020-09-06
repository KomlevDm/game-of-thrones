export interface IWorkerResponse {
  playerLostLives: number;
  playerAttacksIndexes: number[];
  monstersIndexes: number[];
  monstersAttacksIndexes: { monsterIndex: number; attackIndex: number }[];
}
