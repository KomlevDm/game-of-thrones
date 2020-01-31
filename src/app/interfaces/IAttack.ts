import { Subject } from 'rxjs';
import { FabricAttackNodeElementType } from '../types/FabricAttackNodeElementType';
import { IPosition } from './IPosition';
import { EDirection } from '../enums/EDirection';

export interface IAttack {
  name: string;
  sizeInPx: number;
  deltaPositionInPx: IPosition;
  stepSizeInPx: number;
  fabricAttackNodeElement: FabricAttackNodeElementType;
  sound?: () => void;
  attack$?: Subject<EDirection>;
}
