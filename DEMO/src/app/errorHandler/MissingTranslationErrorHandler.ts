import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MissingTranslationErrorHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    const lang = params.translateService.currentLang;
    if (lang == 'ar')
      return 'غير معرف';
    return 'undefined';
  }
}
