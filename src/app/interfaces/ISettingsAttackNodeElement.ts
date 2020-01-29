import { EDirection } from '../enums/EDirection';

export interface ISettingsAttackNodeElement {
  left: number;
  top: number;
  name: string;
  width: number;
  animationDirection?: EDirection;
}
