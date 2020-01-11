import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ToggleLanguageDialogComponent } from './components/toggle-language-dialog/toggle-language-dialog.component';
import { CommonModule } from '@angular/common';
import { ELanguage } from './enums/ELanguage';
import { EKeyLocalStorage } from './enums/EKeyLocalStorage';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent, MainMenuComponent, ToggleLanguageDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    const currentLanguage = localStorage.getItem(EKeyLocalStorage.CurrentLanguage) || ELanguage.En;
    translateService.use(currentLanguage);
  }
}
