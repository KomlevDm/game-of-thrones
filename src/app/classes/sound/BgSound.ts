import { ELocalStorageKey } from '../../enums/ELocalStorageKey';

export class BgSound {
  private static instance: BgSound;

  constructor(private audioPath: string, private soundNames: string[]) {
    if (BgSound.instance instanceof BgSound) return BgSound.instance;
    BgSound.instance = this;
  }

  private currentSound: { element: HTMLAudioElement; index: number } = { element: null, index: 0 };

  public get isMuted(): boolean {
    const isMutedBgSound = localStorage.getItem(ELocalStorageKey.IsMutedBgSound);
    return isMutedBgSound === null ? false : JSON.parse(isMutedBgSound);
  }

  public toggleBgSound(): void {
    const isMutedBgSound = !this.isMuted;
    this.currentSound.element.muted = isMutedBgSound;
    localStorage.setItem(ELocalStorageKey.IsMutedBgSound, isMutedBgSound.toString());
  }

  public play(): void {
    this.currentSound.element = new Audio(`${this.audioPath}/${this.soundNames[this.currentSound.index]}`);
    this.currentSound.element.muted = this.isMuted;
    this.currentSound.element.autoplay = true;

    this.currentSound.element.onended = () => {
      const isEnd = this.currentSound.index === this.soundNames.length - 1;
      this.currentSound.index = isEnd ? 0 : this.currentSound.index + 1;

      this.play();
    };
  }
}
