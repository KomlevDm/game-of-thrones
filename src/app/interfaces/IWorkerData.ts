import { IPosition } from './IPosition';
import { ISize } from './ISize';

export interface IWorkerData {
  player: {
    positionInPx: IPosition;
    sizeInPx: ISize;
  };

  playerAttacks: {
    leftInPx: number;
    topInPx: number;
    sizeInPx: number;
  }[];

  monsters: {
    positionInPx: IPosition;
    sizeInPx: ISize;
  }[];

  monstersAttacks: {
    leftInPx: number;
    topInPx: number;
    sizeInPx: number;
  }[][];
}
