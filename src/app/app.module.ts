import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToggleLanguageDialogComponent } from './components/toggle-language-dialog/toggle-language-dialog.component';
import { CommonModule } from '@angular/common';
import { ELanguage } from './enums/ELanguage';
import { EKeyLocalStorage } from './enums/EKeyLocalStorage';
import { TopTableComponent } from './components/top-table/top-table.component';
import { HeroSelectionComponent } from './components/hero-selection/hero-selection.component';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { GameDialogComponent } from './components/game-dialog/game-dialog.component';
import { LoadComponent } from './components/load/load.component';
import { BackArrowComponent } from './components/back-arrow/back-arrow.component';
import { StartPageModule } from './pages/start-page/start-page.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    ToggleLanguageDialogComponent,
    TopTableComponent,
    HeroSelectionComponent,
    GameComponent,
    GameDialogComponent,
    LoadComponent,
    BackArrowComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StartPageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _translateService: TranslateService) {
    const currentLanguage = localStorage.getItem(EKeyLocalStorage.CurrentLanguage) || ELanguage.En;
    this._translateService.use(currentLanguage);
  }
}
