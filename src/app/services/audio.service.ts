import { Injectable } from '@angular/core';
import { AUDIO_LIST } from 'src/assets/audio/audio-list';
import { BackgroundAudio } from '../classes/audio/BackgroundAudio';

@Injectable({ providedIn: 'root' })
export class AudioService {
  public static instance: AudioService;

  constructor() {
    AudioService.instance = this;

    Audio.prototype.stop = function () {
      this.pause();
      this.currentTime = 0;
    };

    Audio.prototype.restart = function () {
      this.pause();
      this.currentTime = 0;
      this.play();
    };
  }

  private readonly AUDIO_PATH = '../../assets/audio';
  private readonly backgroundAudio = new BackgroundAudio(this.AUDIO_PATH, Object.values(AUDIO_LIST.background));

  public playGame: HTMLAudioElement;
  public dragonFlame: HTMLAudioElement;
  public blade: HTMLAudioElement;
  public shortTomahawk: HTMLAudioElement;
  public past: HTMLAudioElement;
  public dragonStompy: HTMLAudioElement;
  public dragonRoar: HTMLAudioElement;
  public lionRoar: HTMLAudioElement;
  public wolfRipsApartEnemy: HTMLAudioElement;
  public shield: HTMLAudioElement;
  public heroAttack: HTMLAudioElement;
  public coinsRinging: HTMLAudioElement;
  public thunder: HTMLAudioElement;
  public death: HTMLAudioElement;

  public get isMutedBackgroundAudio(): boolean {
    return this.backgroundAudio.isMuted;
  }

  public init(): void {
    this.playGame = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.playGame}`);

    this.dragonFlame = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.dragonFlame}`);
    this.dragonFlame.volume = 0.5;

    this.blade = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.blade}`);

    this.shortTomahawk = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.shortTomahawk}`);
    this.shortTomahawk.volume = 0.5;

    this.past = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.past}`);

    this.dragonStompy = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.dragonStompy}`);

    this.dragonRoar = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.dragonRoar}`);
    this.dragonRoar.volume = 0.5;

    this.lionRoar = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.lionRoar}`);
    this.lionRoar.volume = 0.5;

    this.wolfRipsApartEnemy = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.wolfRipsApartEnemy}`);

    this.shield = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.shield}`);

    this.heroAttack = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.heroAttack}`);

    this.coinsRinging = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.coinsRinging}`);

    this.thunder = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.thunder}`);

    this.death = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.death}`);

    this.backgroundAudio.play();
  }

  public toggleBackgroundAudio(): void {
    this.backgroundAudio.toggle();
  }
}
