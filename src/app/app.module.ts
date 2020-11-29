import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapRouterOutletModule } from './components/wrap-router-outlet/wrap-router-outlet.module';
import { EKeyLocalStorage } from './enums/EKeyLocalStorage';
import { ELanguage } from './enums/ELanguage';
import { StartPageModule } from './pages/start-page/start-page.module';

@NgModule({
  declarations: [AppComponent],
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
  constructor(private _translateService: TranslateService) {
    const currentLanguage = localStorage.getItem(EKeyLocalStorage.CurrentLanguage) || ELanguage.En;
    this._translateService.use(currentLanguage);
  }
}
