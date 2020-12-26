import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  HostBinding,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ELanguage } from 'src/app/enums/ELanguage';
import { ELocalStorageKey } from 'src/app/enums/ELocalStorageKey';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'toggle-language-dialog',
  templateUrl: './toggle-language-dialog.component.html',
  styleUrls: ['./toggle-language-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLanguageDialogComponent implements OnInit, OnDestroy {
  constructor(
    private audioService: AudioService,
    private cdr: ChangeDetectorRef,
    public translateService: TranslateService
  ) {}

  private destroyer$ = new Subject<void>();

  public ELanguage = ELanguage;

  @HostBinding('class.show')
  public state = false;

  @Input()
  public state$: BehaviorSubject<boolean>;

  ngOnInit(): void {
    this.state$.pipe(takeUntil(this.destroyer$)).subscribe((state) => {
      this.state = state;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public toggleLanguage(language: ELanguage): void {
    this.audioService.blade.restart();

    this.translateService.use(language);
    localStorage.setItem(ELocalStorageKey.CurrentLanguage, language);
  }

  public close(): void {
    this.audioService.past.restart();
    this.state$.next(false);
  }

  @HostListener('document:keydown.escape')
  public onKeydownEscapeHandler() {
    if (this.state) this.close();
  }
}
