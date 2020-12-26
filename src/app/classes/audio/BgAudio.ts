import { ELocalStorageKey } from '../../enums/ELocalStorageKey';

export class BgAudio {
  private static instance: BgAudio;

  constructor(private audioPath: string, private soundNames: string[]) {
    if (BgAudio.instance instanceof BgAudio) return BgAudio.instance;
    BgAudio.instance = this;
  }

  private currentSound: { element: HTMLAudioElement; index: number } = { element: null, index: 0 };

  public get isMuted(): boolean {
    const isMutedBgAudio = localStorage.getItem(ELocalStorageKey.IsMutedBgAudio);
    return isMutedBgAudio === null ? false : JSON.parse(isMutedBgAudio);
  }

  public toggleBgAudio(): void {
    const isMutedBgAudio = !this.isMuted;
    this.currentSound.element.muted = isMutedBgAudio;
    localStorage.setItem(ELocalStorageKey.IsMutedBgAudio, isMutedBgAudio.toString());
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
