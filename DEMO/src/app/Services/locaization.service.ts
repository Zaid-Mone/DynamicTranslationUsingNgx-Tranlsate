import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaizationService {

  constructor(private _http: HttpClient, private translateService: TranslateService) { }


  getTranslation() {
    const langs = ['en', 'ar'];
    const desiredLanguage = localStorage.getItem('default_Language') ?? 'ar';
    const apiCalls = langs.map(lang => {
      return this._http.get<any>('myProjectDomain/GetLocalization/' + lang); // Explicitly specify 'any' type for response
    });

    forkJoin(apiCalls).subscribe({
      next: (responses) => {
        responses.forEach((response, index) => {
          const lang = langs[index];
          this.translateService.setTranslation(lang, response, false); // Assuming response is the translation data
          console.log(`Translation for ${lang} loaded successfully.`);
        });
        this.translateService.use(desiredLanguage);
      },
      error: (error) => {
        console.error('Error loading translations:', error);
      }
    });

  }

  getTranslations1() {
    const langs = ['en', 'ar'];
    //getting the language from the localstorege if there is no lang then use the [en] or [ar] as a default lanugae
    const desiredLanguage = localStorage.getItem('default_Language') ?? 'ar';
    const apiCalls = langs.map(lang => {
      this._http.get<any>(`myProjectDomain/GetLocalization/${lang}`)
    });
    //use forkJoin to execute API the loop(langs) calls for all languages in parallel like the callback()
    forkJoin(apiCalls).subscribe({
      next: ([enResponse, arResponse]) => {
        this.translateService.setTranslation('en', enResponse?.data, false);
        this.translateService.setTranslation('ar', arResponse?.data, false);
        this.translateService.use(desiredLanguage);
        console.log(`Translation for en loaded successfully.`);
        console.log(`Translation for ar loaded successfully.`);
      },
      error: (error) => {
        console.error('Error loading translations:', error);
      }
    });
  }
// the coorect one 
  getTranslation2() {
    const langs = ['en', 'ar'];

    // Get desired language (handle potential absence)
    const desiredLanguage = localStorage.getItem('default_Language') || 'ar';

    // Prepare API calls
    const apiCalls = langs.map(lang => this._http.get<any>(`myProjectDomain/GetLocalization/${lang}`)); // Explicit type annotation

    // Execute parallel API calls with forkJoin
    forkJoin(apiCalls).subscribe({
      next: ([enResponse, arResponse]) => {
        // Check for successful responses and data existence before accessing properties
        if (enResponse?.ok && enResponse.body?.data) {
          this.translateService.setTranslation('en', enResponse.body.data, false);
        }
        if (arResponse?.ok && arResponse.body?.data) {
          this.translateService.setTranslation('ar', arResponse.body.data, false);
        }
        this.translateService.use(desiredLanguage);
        console.log(`Translation for en loaded successfully.`);
        console.log(`Translation for ar loaded successfully.`);
      },
      error: (error) => {
        console.error('Error loading translations:', error);
      }
    });
  }



}


