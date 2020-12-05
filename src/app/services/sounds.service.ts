import { Injectable } from '@angular/core';
import { AUDIO_LIST } from 'src/assets/audio/audio-list';
import { BgSound } from '../classes/sound/BgSound';

@Injectable({ providedIn: 'root' })
export class SoundsService {
  public static instance: SoundsService;

  constructor() {
    SoundsService.instance = this;

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
  private readonly bgSound = new BgSound(this.AUDIO_PATH, Object.values(AUDIO_LIST.background));

  public startGame: HTMLAudioElement;
  public dragonFlame: HTMLAudioElement;
  public blade: HTMLAudioElement;
  public shortTomahawk: HTMLAudioElement;
  public past: HTMLAudioElement;
  public dragonStompy: HTMLAudioElement;
  public dragonRoar: HTMLAudioElement;
  public lionRoar: HTMLAudioElement;
  public wolfRipsApartEnemy: HTMLAudioElement;
  public shield: HTMLAudioElement;
  public starkAttack: HTMLAudioElement;
  public targaryenAttack: HTMLAudioElement;
  public lannisterAttack: HTMLAudioElement;
  public coinsRinging: HTMLAudioElement;
  public gameOver: HTMLAudioElement;
  public death: HTMLAudioElement;

  public get isMutedBgSound(): boolean {
    return this.bgSound.isMuted;
  }

  public init(): void {
    this.startGame = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.startGame}`);

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

    this.starkAttack = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.starkAttack}`);

    this.targaryenAttack = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.targaryenAttack}`);

    this.lannisterAttack = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.lannisterAttack}`);

    this.coinsRinging = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.coinsRinging}`);

    this.gameOver = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.gameOver}`);

    this.death = new Audio(`${this.AUDIO_PATH}/${AUDIO_LIST.action.death}`);

    this.bgSound.play();
  }

  public toggleBgSound(): void {
    this.bgSound.toggleBgSound();
  }
}
