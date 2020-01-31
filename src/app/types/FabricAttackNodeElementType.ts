import { IAttackNodeElementSettings } from '../interfaces/IAttackNodeElementSettings';
import { EmbeddedViewRef } from '@angular/core';

export type FabricAttackNodeElementType = (
  settings: IAttackNodeElementSettings
) => EmbeddedViewRef<IAttackNodeElementSettings>;
