import { Component, OnInit } from '@angular/core';
import { BACKGROUND_AUDIO, ACTION_AUDIO } from 'src/assets/audio/audio-list';

interface IBgSound {
  soundNames: string[];
  currentSound: HTMLAudioElement;
  currentSoundIndex: number;
  toggler: boolean;
}

const PATH_TO_AUDIO = '../../../assets/audio';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  constructor() {}

  private hoverFireSphereSound: HTMLAudioElement = null;
  private hoverButtonMenuSound: HTMLAudioElement = null;

  public mainSounds: IBgSound = {
    soundNames: Object.values(BACKGROUND_AUDIO.mainMenu),
    currentSoundIndex: 0,
    currentSound: null,
    toggler: true
  };

  ngOnInit() {
    this.playMainSound();

    this.hoverFireSphereSound = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.dragonFlame}`);
    this.hoverFireSphereSound.volume = 0.5;

    this.hoverButtonMenuSound = new Audio(`${PATH_TO_AUDIO}/${ACTION_AUDIO.blade}`);
  }

  public toggleMainSoundVolume() {
    this.mainSounds.currentSound.volume = this.mainSounds.toggler ? 0 : 1;
    this.mainSounds.toggler = !this.mainSounds.toggler;
  }

  public mouseenterFireSphere() {
    this.hoverFireSphereSound.play();
  }

  public mouseenterButtonMenu() {
    this.hoverButtonMenuSound.play();
  }
  public mouseleaveButtonMenu() {
    this.hoverButtonMenuSound.pause();
    this.hoverButtonMenuSound.currentTime = 0;
  }

  private playMainSound() {
    this.mainSounds.currentSound = new Audio(
      `${PATH_TO_AUDIO}/${this.mainSounds.soundNames[this.mainSounds.currentSoundIndex]}`
    );
    this.mainSounds.currentSound.volume = Number(this.mainSounds.toggler);
    this.mainSounds.currentSound.play();

    this.mainSounds.currentSound.onended = () => {
      this.mainSounds.currentSoundIndex =
        this.mainSounds.currentSoundIndex === this.mainSounds.soundNames.length - 1
          ? 0
          : this.mainSounds.currentSoundIndex + 1;

      this.playMainSound();
    };
  }
}
