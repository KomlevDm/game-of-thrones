import { Component, Input, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ELanguage } from 'src/app/enums/ELanguage';
import { EKeyLocalStorage } from 'src/app/enums/EKeyLocalStorage';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'toggle-language-dialog',
  templateUrl: './toggle-language-dialog.component.html',
  styleUrls: ['./toggle-language-dialog.component.scss']
})
export class ToggleLanguageDialogComponent {
  constructor(private soundsService: SoundsService, public translateService: TranslateService) {}

  public ELanguage = ELanguage;

  @Input() state$: BehaviorSubject<boolean>;

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    if (this.state$.value) this.close();
  }

  public toggleLanguage(language: ELanguage) {
    this.soundsService.blade.restart();

    this.translateService.use(language);
    localStorage.setItem(EKeyLocalStorage.CurrentLanguage, language);
  }

  public close() {
    this.soundsService.past.restart();
    this.state$.next(false);
  }
}
