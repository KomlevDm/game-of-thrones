import { ComponentRef, Injectable } from '@angular/core';
import { interval, mapTo, mergeMap, Subscription, timer } from 'rxjs';
import { ArtifactComponent } from '../pages/game-page/artifact/artifact.component';
import { GameService } from './game.service';

@Injectable()
export class ArtifactService {
  private static readonly GENERATION_INTERVAL_IN_MS = 3 * 1000;
  private static readonly ARTIFACT_LIFETIME_IN_MS = 5 * 1000;
  private static readonly ARTIFACT_SIZE_IN_PX = 50;

  private artifactMap = new Map<ComponentRef<ArtifactComponent>, () => void>([]);
  private generationSubscription: Subscription;

  public startArtifactsGeneration(): void {
    if (this.generationSubscription && !this.generationSubscription?.closed) return;

    this.generationSubscription = interval(ArtifactService.GENERATION_INTERVAL_IN_MS)
      .pipe(
        mergeMap(() => {
          const { gameField, cfr } = GameService.getGameRender();

          const viewRef = gameField.createComponent(cfr.resolveComponentFactory(ArtifactComponent));

          this.initView(viewRef.instance);

          this.artifactMap.set(viewRef, viewRef.destroy.bind(viewRef));

          return timer(ArtifactService.ARTIFACT_LIFETIME_IN_MS).pipe(mapTo(viewRef));
        })
      )
      .subscribe((viewRef) => this.artifactMap.get(viewRef)());
  }

  public stopArtifactsGeneration(): void {
    this.generationSubscription?.unsubscribe();
    this.artifactMap.forEach((destroy) => destroy());
    this.artifactMap.clear();
  }

  private getRandomArtifactType(): EArtifactType {
    const types = Object.keys(EArtifactType);
    const typeIndex = Math.floor(Math.random() * types.length);

    return EArtifactType[types[typeIndex]];
  }

  private getRandomArtifactXPositionInPx(): number {
    return Math.floor(
      Math.random() * (GameService.SIZE_FIELD_GAME_IN_PX.WIDTH - ArtifactService.ARTIFACT_SIZE_IN_PX + 1)
    );
  }

  private getRandomArtifactYPositionInPx(): number {
    return Math.floor(Math.random() * 151 + 200);
  }

  private initView(view: ArtifactComponent): void {
    view.type = this.getRandomArtifactType();
    view.xPositionInPx = this.getRandomArtifactXPositionInPx();
    view.yPositionInPx = this.getRandomArtifactYPositionInPx();
  }
}

export enum EArtifactType {
  Life = 'life',
  SuperAttack = 'super-attack',
  SuperPunch = 'super-punch',
  AttackSpeed = 'attack-speed',
}
