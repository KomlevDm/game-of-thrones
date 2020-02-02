import { Injectable } from '@angular/core';
import { ACTION_AUDIO, BACKGROUND_AUDIO } from 'src/assets/audio/audio-list';
import { EKeyLocalStorage } from '../enums/EKeyLocalStorage';

const PATH_TO_AUDIO = '../../assets/audio';

interface IBgSound {
  soundNames: string[];
  currentSound: {
    element: HTMLAudioElement;
    index: number;
  };
  isMuted: boolean;
}

interface IExtHTMLAudioElement extends HTMLAudioElement {
  stop?: () => void;
  restart?: () => void;
}

@Injectable({ providedIn: 'root' })
export class SoundsService {
  static instance: SoundsService;

  constructor() {
    SoundsService.instance = this;

    Audio.prototype.stop = function() {
      this.pause();
      this.currentTime = 0;
    };

    Audio.prototype.restart = function() {
      this.pause();
      this.currentTime = 0;
      this.play();
    };

    const isMutedBgSound = localStorage.getItem(EKeyLocalStorage.IsMutedBgSound);
    this._bgSound.isMuted = isMutedBgSound === null ? false : JSON.parse(isMutedBgSound);
  }

  private readonly _bgSound: IBgSound = {
    soundNames: Object.values(BACKGROUND_AUDIO.mainMenu),
    currentSound: {
      element: null,
      index: 0
    },
    isMuted: false
  };

  public startGame: IExtHTMLAudioElement = null;
  public dragonFlame: IExtHTMLAudioElement = null;
  public blade: IExtHTMLAudioElement = null;
  public shortTomahawk: IExtHTMLAudioElement = null;
  public past: IExtHTMLAudioElement = null;
  public dragonStompy: IExtHTMLAudioElement = null;
  public dragonRoar: IExtHTMLAudioElement = null;
  public lionRoar: IExtHTMLAudioElement = null;
  public wolfRipsApartEnemy: IExtHTMLAudioElement = null;
  public shield: IExtHTMLAudioElement = null;
  public starkAttack: IExtHTMLAudioElement = null;
  public targaryenAttack: IExtHTMLAudioElement = null;
  public lannisterAttack: IExtHTMLAudioElement = null;
  public coinsRinging: IExtHTMLAudioElement = null;
  public gameOver: IExtHTMLAudioElement = null;
  public death: IExtHTMLAudioElement = null;

  public get isMutedBgSound(): boolean {
    return this._bgSound.isMuted;
  }

  public init(): void {
    this.startGame = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.startGame}`);

    this.dragonFlame = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonFlame}`);
    this.dragonFlame.volume = 0.5;

    this.blade = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.blade}`);

    this.shortTomahawk = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.shortTomahawk}`);
    this.shortTomahawk.volume = 0.5;

    this.past = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.past}`);

    this.dragonStompy = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonStompy}`);

    this.dragonRoar = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonRoar}`);
    this.dragonRoar.volume = 0.5;

    this.lionRoar = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.lionRoar}`);
    this.lionRoar.volume = 0.5;

    this.wolfRipsApartEnemy = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.wolfRipsApartEnemy}`);

    this.shield = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.shield}`);

    this.starkAttack = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.starkAttack}`);

    this.targaryenAttack = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.targaryenAttack}`);

    this.lannisterAttack = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.lannisterAttack}`);

    this.coinsRinging = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.coinsRinging}`);

    this.gameOver = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.gameOver}`);

    this.death = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.death}`);

    this._playBgSound();
  }

  public toggleBgSound(): void {
    this._bgSound.isMuted = !this._bgSound.isMuted;
    this._bgSound.currentSound.element.muted = this._bgSound.isMuted;
    localStorage.setItem(EKeyLocalStorage.IsMutedBgSound, this._bgSound.isMuted.toString());
  }

  private _playBgSound(): void {
    this._bgSound.currentSound.element = new Audio(
      `${PATH_TO_AUDIO}/${this._bgSound.soundNames[this._bgSound.currentSound.index]}`
    );
    this._bgSound.currentSound.element.muted = this._bgSound.isMuted;
    this._bgSound.currentSound.element.autoplay = true;

    this._bgSound.currentSound.element.onended = () => {
      this._bgSound.currentSound.index =
        this._bgSound.currentSound.index === this._bgSound.soundNames.length - 1
          ? 0
          : this._bgSound.currentSound.index + 1;

      this._playBgSound();
    };
  }
}
