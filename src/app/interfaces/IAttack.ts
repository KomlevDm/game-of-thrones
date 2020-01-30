import { Subject } from 'rxjs';
import { FabricAttackNodeElementType } from '../types/FabricAttackNodeElementType';

export interface IAttack {
  name: string;
  deltaTopPositionInPx: number;
  deltaLeftPositionInPx?: number;
  stepSizeInPx: number;
  sizeInPx: number;
  gapWithoutAttackingInPx: number;
  fabricAttackNodeElement: FabricAttackNodeElementType;
  sound?: () => void;
  attack$?: Subject<string>;
}
