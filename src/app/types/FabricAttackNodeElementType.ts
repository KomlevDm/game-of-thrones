import { ISettingsAttackNodeElement } from '../interfaces/ISettingsAttackNodeElement';
import { EmbeddedViewRef } from '@angular/core';

export type FabricAttackNodeElementType = (
  settings: ISettingsAttackNodeElement
) => EmbeddedViewRef<ISettingsAttackNodeElement>;
