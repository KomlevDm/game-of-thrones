import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapRouterOutletModule } from './components/wrap-router-outlet/wrap-router-outlet.module';
import { ELocalStorageKey } from './enums/ELocalStorageKey';
import { ELanguage } from './enums/ELanguage';
import { StartPageModule } from './pages/start-page/start-page.module';
import { SnowBackgroundComponent } from './components/snow-background/snow-background.component';

@NgModule({
  declarations: [AppComponent, SnowBackgroundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
        deps: [HttpClient],
      },
    }),
    WrapRouterOutletModule,
    StartPageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translateService: TranslateService) {
    const currentLanguage = localStorage.getItem(ELocalStorageKey.CurrentLanguage) || ELanguage.En;
    translateService.use(currentLanguage);
  }
}
