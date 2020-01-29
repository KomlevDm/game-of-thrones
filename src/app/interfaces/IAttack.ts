import { Subject } from 'rxjs';
import { FabricAttackNodeElementType } from '../types/FabricAttackNodeElementType';

export interface IAttack<T> {
  name: string;
  deltaTopPositionInPx: number;
  deltaLeftPositionInPx?: number;
  stepSizeInPx: number;
  widthInPx: number;
  gapWithoutAttackingInPx: number;
  fabricAttackNodeElement: FabricAttackNodeElementType;
  sound?: () => void;
  attack$: Subject<T>;
}
