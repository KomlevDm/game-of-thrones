import { EDirection } from '../enums/EDirection';

export interface ISettingsAttackNodeElement {
  name: string;
  leftInPx: number;
  topInPx: number;
  sizeInPx: number;
  animationDirection?: EDirection;
}
