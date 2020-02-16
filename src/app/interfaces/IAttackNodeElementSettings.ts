import { EDirection } from '../enums/EDirection';

export interface IAttackNodeElementSettings {
  name: string;
  leftInPx: number;
  topInPx: number;
  sizeInPx: number;
  animationDirection?: EDirection;
}
