import { EmbeddedViewRef } from '@angular/core';
import { Monster } from '../classes/monster/Monster';

export type FabricMonsterNodeElementType = (settings: Monster) => EmbeddedViewRef<Monster>;
