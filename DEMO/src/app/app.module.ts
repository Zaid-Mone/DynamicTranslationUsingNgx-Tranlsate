import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocaizationService } from './Services/locaization.service';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MissingTranslationErrorHandler } from './errorHandler/MissingTranslationErrorHandler';
//function HttpLoaderFactory(http: HttpClient) {
//  return new TranslateHttpLoader(http);
//}

//export function initApp(translationService: LocaizationService): () => Promise<any> {
//  console.log('1');
//  // You may need to fetch the language ID from an API or local storage
//  const langID = 1; // Replace with logic to get the actual LanguageID
//  console.log('1 is loaded');
//  return () => translationService.getTranslationWithPromises();
//}


export function initApp(localizationService: LocaizationService): () => Promise<any> {
  return async () => {
    try {
      //console.log('Fetching available languages...');
      //const languages = await localizationService.fetchAvailableLanguages();
      //console.log('Available languages:', languages);

      // Assuming you want to load the first available language
      //const defaultLanguage = languages[0]; // Or use logic to determine the default language

      //console.log('Loading translations for:', defaultLanguage);
      await localizationService.getTranslationWithPromises();

      console.log('Localization loaded successfully');
    } catch (error) {
      console.error('Error loading localization:', error);
    }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationErrorHandler }, // for handle the not found localization
      loader: {
        provide: TranslateLoader,
        useClass: LocaizationService,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [LocaizationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
