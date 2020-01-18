import { Injectable } from '@angular/core';
import { ACTION_AUDIO, BACKGROUND_AUDIO } from 'src/assets/audio/audio-list';
import { EKeyLocalStorage } from '../enums/EKeyLocalStorage';

const PATH_TO_AUDIO = '../../assets/audio';

interface IBgSound {
  soundNames: string[];
  currentSound: HTMLAudioElement;
  currentSoundIndex: number;
  toggler: boolean;
}

interface IExtHTMLAudioElement extends HTMLAudioElement {
  stop?: () => void;
  restart?: () => void;
}

@Injectable({ providedIn: 'root' })
export class SoundsService {
  constructor() {
    Audio.prototype.stop = function() {
      this.pause();
      this.currentTime = 0;
    };

    Audio.prototype.restart = function() {
      this.pause();
      this.currentTime = 0;
      this.play();
    };
  }

  private _bgSound: IBgSound = {
    soundNames: Object.values(BACKGROUND_AUDIO.mainMenu),
    currentSoundIndex: 0,
    currentSound: null,
    toggler: this.initTogglerBgSound()
  };

  public dragonFlame: IExtHTMLAudioElement = null;
  public blade: IExtHTMLAudioElement = null;
  public tomahawk: IExtHTMLAudioElement = null;
  public shortTomahawk: IExtHTMLAudioElement = null;
  public pierceWithSword: IExtHTMLAudioElement = null;
  public past: IExtHTMLAudioElement = null;
  public dragonStompy: IExtHTMLAudioElement = null;
  public dragonRoar: IExtHTMLAudioElement = null;
  public swordBattle: IExtHTMLAudioElement = null;

  public get togglerBgSound(): boolean {
    return this._bgSound.toggler;
  }

  public init(): void {
    this.dragonFlame = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonFlame}`);
    this.dragonFlame.volume = 0.5;

    this.blade = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.blade}`);

    this.tomahawk = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.tomahawk}`);
    this.shortTomahawk = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.shortTomahawk}`);

    this.pierceWithSword = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.pierceWithSword}`);

    this.past = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.past}`);

    this.dragonStompy = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonStompy}`);

    this.dragonRoar = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonRoar}`);
    this.dragonRoar.volume = 0.5;

    this.swordBattle = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.swordBattle}`);

    this.playBgSound();
  }

  public toggleBgSound(): void {
    this._bgSound.currentSound.volume = this._bgSound.toggler ? 0 : 1;
    this._bgSound.toggler = !this._bgSound.toggler;
    localStorage.setItem(EKeyLocalStorage.TogglerBgSound, this._bgSound.toggler.toString());
  }

  private playBgSound(): void {
    this._bgSound.currentSound = new Audio(
      `${PATH_TO_AUDIO}/${this._bgSound.soundNames[this._bgSound.currentSoundIndex]}`
    );
    this._bgSound.currentSound.volume = Number(this._bgSound.toggler);
    this._bgSound.currentSound.play();

    this._bgSound.currentSound.onended = () => {
      this._bgSound.currentSoundIndex =
        this._bgSound.currentSoundIndex === this._bgSound.soundNames.length - 1
          ? 0
          : this._bgSound.currentSoundIndex + 1;

      this.playBgSound();
    };
  }

  private initTogglerBgSound(): boolean {
    const togglerBgSound = localStorage.getItem(EKeyLocalStorage.TogglerBgSound);

    return togglerBgSound === null ? true : JSON.parse(togglerBgSound);
  }
}
