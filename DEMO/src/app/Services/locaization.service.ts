import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, catchError, forkJoin, map, of, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaizationService implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private _http: HttpClient, private translateService: TranslateService) { }


  getTranslations() {
    const langs = ['en', 'ar'];
    const desiredLanguage = localStorage.getItem('default_Language') ?? 'ar';
    const apiCalls = langs.map(lang => {
      return this._http.get<any>('myProjectDomain/GetLocalization/' + lang); // Explicitly specify 'any' type for response
    });

    forkJoin(apiCalls).pipe(takeUntil(this.destroy$)).subscribe({
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


  getTranslation(langID: number = 1) {

    const _langId = (langID == null || langID == undefined || isNaN(langID) ? 1 : langID);

    const desiredLanguage = (localStorage.getItem('default_Language') ?? 'ar');

    this._http.get<any>(`myProjectDomain/GetLocalization?LangID=${langID}`).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.translateService.setTranslation(desiredLanguage, response, false);
      this.translateService.use(desiredLanguage);

    }, (error) => {
      console.error('Error loading translations:', error);
    });

  }



  // Function to load translations and return a promise
  getTranslationWithPromises(langID: string = '30e32a11-b297-4f0e-babd-b92a7633ecde'): Promise<any> {
    const _langId = (langID == null || langID == undefined   ? '30e32a11-b297-4f0e-babd-b92a7633ecde' : langID);
    const desiredLanguage = localStorage.getItem('default_Language') ?? 'en';
    
    return this._http.get<any>(`http://eshop.runasp.net/api/Common/GetResources?langID=${langID}&ModuleID=5`).pipe(
      takeUntil(this.destroy$),
      map(response => {
        this.translateService.setTranslation(desiredLanguage, response, false);
        this.translateService.use(desiredLanguage);
        return response; // Resolve with response data if needed
      }),
      catchError(error => {
        console.error('Error loading translations:', error);
        return of({}); // Handle errors, return empty object or appropriate fallback
      })
    ).toPromise();
  }







  // Function to load translations and return a promise
  getTranslationWithPromise(langID: number = 1): Promise<any> {
    const _langId = (langID == null || langID == undefined || isNaN(langID) ? 1 : langID);
    const desiredLanguage = localStorage.getItem('default_Language') ?? 'ar';

    return this._http.get<any>(`myProjectDomain/GetLocalization?LangID=${_langId}`).pipe(
      takeUntil(this.destroy$),
      map(response => {
        this.translateService.setTranslation(desiredLanguage, response, false);
        this.translateService.use(desiredLanguage);
        return response; // Resolve with response data if needed
      }),
      catchError(error => {
        console.error('Error loading translations:', error);
        return of({}); // Handle errors, return empty object or appropriate fallback
      })
    ).toPromise();
  }

  getTranslationWithModuleIDAndLanuageID(ModuleID: number = 0, langID: number = 1) {

    const _langId = (langID == null || langID == undefined || isNaN(langID) ? 1 : langID);

    const desiredLanguage = (localStorage.getItem('default_Language') ?? 'ar');

    this._http.get<any>(`myProjectDomain/GetLocalization?ModuleID=${ModuleID}&LangID=${langID}`).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.translateService.setTranslation(desiredLanguage, response, false);
      this.translateService.use(desiredLanguage);

    }, (error) => {
      console.error('Error loading translations:', error);
    });

  }


  getTranslationWithoutParams() {


    const desiredLanguage = (localStorage.getItem('default_Language') ?? 'ar');

    this._http.get<any>(`myProjectDomain/GetLocalization?Lang=${desiredLanguage}`).subscribe((response) => {
      this.translateService.setTranslation(desiredLanguage, response, false);
      this.translateService.use(desiredLanguage);

    }, (error) => {
      console.error('Error loading translations:', error);
    });

  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }




  //#region
  //getTranslations1() {
  //  const langs = ['en', 'ar'];
  //  //getting the language from the localstorege if there is no lang then use the [en] or [ar] as a default lanugae
  //  const desiredLanguage = localStorage.getItem('default_Language') ?? 'ar';
  //  const apiCalls = langs.map(lang => {
  //    this._http.get<any>(`myProjectDomain/GetLocalization/${lang}`)
  //  });
  //  //use forkJoin to execute API the loop(langs) calls for all languages in parallel like the callback()
  //  forkJoin(apiCalls).subscribe({
  //    next: ([enResponse, arResponse]) => {
  //      this.translateService.setTranslation('en', enResponse?.data, false);
  //      this.translateService.setTranslation('ar', arResponse?.data, false);
  //      this.translateService.use(desiredLanguage);
  //      console.log(`Translation for en loaded successfully.`);
  //      console.log(`Translation for ar loaded successfully.`);
  //    },
  //    error: (error) => {
  //      console.error('Error loading translations:', error);
  //    }
  //  });
  //}
  // the coorect one 
  //getTranslation2() {
  //  const langs = ['en', 'ar'];

  //  // Get desired language (handle potential absence)
  //  const desiredLanguage = localStorage.getItem('default_Language') || 'ar';

  //  // Prepare API calls
  //  const apiCalls = langs.map(lang => this._http.get<any>(`myProjectDomain/GetLocalization/${lang}`)); // Explicit type annotation

  //  // Execute parallel API calls with forkJoin
  //  forkJoin(apiCalls).subscribe({
  //    next: ([enResponse, arResponse]) => {
  //      // Check for successful responses and data existence before accessing properties
  //      if (enResponse?.ok && enResponse.body?.data) {
  //        this.translateService.setTranslation('en', enResponse.body.data, false);
  //      }
  //      if (arResponse?.ok && arResponse.body?.data) {
  //        this.translateService.setTranslation('ar', arResponse.body.data, false);
  //      }
  //      this.translateService.use(desiredLanguage);
  //      console.log(`Translation for en loaded successfully.`);
  //      console.log(`Translation for ar loaded successfully.`);
  //    },
  //    error: (error) => {
  //      console.error('Error loading translations:', error);
  //    }
  //  });
  //}

  //#endregion



}


