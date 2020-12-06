import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ELanguage } from 'src/app/enums/ELanguage';
import { ELocalStorageKey } from 'src/app/enums/ELocalStorageKey';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'toggle-language-dialog',
  templateUrl: './toggle-language-dialog.component.html',
  styleUrls: ['./toggle-language-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLanguageDialogComponent implements OnInit {
  constructor(
    private soundsService: SoundsService,
    private cdr: ChangeDetectorRef,
    public translateService: TranslateService
  ) {}

  private destroyer$ = new Subject<void>();

  public ELanguage = ELanguage;

  @HostBinding('class.show')
  public state = false;

  @Input()
  public state$: BehaviorSubject<boolean>;

  public ngOnInit(): void {
    this.state$.pipe(takeUntil(this.destroyer$)).subscribe((state) => {
      this.state = state;
      this.cdr.detectChanges();
    });
  }

  public toggleLanguage(language: ELanguage): void {
    this.soundsService.blade.restart();

    this.translateService.use(language);
    localStorage.setItem(ELocalStorageKey.CurrentLanguage, language);
  }

  public close(): void {
    this.soundsService.past.restart();
    this.state$.next(false);
  }

  @HostListener('document:keydown.escape')
  public onKeydownEscapeHandler() {
    if (this.state) this.close();
  }
}
