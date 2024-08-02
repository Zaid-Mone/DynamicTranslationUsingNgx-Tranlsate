import { NgModule } from '@angular/core';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
