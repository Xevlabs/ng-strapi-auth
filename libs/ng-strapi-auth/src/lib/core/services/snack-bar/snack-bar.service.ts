import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';
import { SnackBarTypeEnum } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private toast: HotToastService, private transloco: TranslocoService) {
  }

  showSnackBar(type: SnackBarTypeEnum, titleKey: string, messageKey?: string) {
    let HtmlContent = `
          <h4 class='bold no-margin'>${this.transloco.translate(titleKey)}</h4>
        `;
    if (messageKey) {
      HtmlContent += `<p class='no-margin-bottom'>${this.transloco.translate(titleKey)}</p>`;
    }
    switch (type) {
      case SnackBarTypeEnum.SUCCESS:
        return this.toast.success(HtmlContent, {
          className: 'xevlabs-auth-snackbar ' + type,
          dismissible: true,
          autoClose: false
        });
      case SnackBarTypeEnum.ERROR:
        return this.toast.error(HtmlContent, { className: 'xevlabs-auth-snackbar ' + type, dismissible: true });
      case SnackBarTypeEnum.WARNING:
        return this.toast.warning(HtmlContent, { className: 'xevlabs-auth-snackbar ' + type, dismissible: true });
    }
  }

  getObservableSnackbar(loadingKey: string, successKey: string, errorKey: string) {
      return this.toast.observe({
      loading:
        {
          content: `<h4 class='bold no-margin'>${this.transloco.translate(loadingKey + '.TITLE')}</h4>
                    <p class='no-margin-bottom'>${this.transloco.translate(loadingKey+ '.MESSAGE')}</p>`,
          className: 'xevlabs-auth-snackbar LOADING',
          autoClose: false
        },
      success: {
        content: `<h4 class='bold no-margin'>${this.transloco.translate(successKey + '.TITLE')}</h4>
                  <p class='no-margin-bottom'>${this.transloco.translate(successKey+ '.MESSAGE')}</p>`,
        className: 'xevlabs-auth-snackbar SUCCESS',
        autoClose: false,
        dismissible: true
      },
      error: {
        content: `<h4 class='bold no-margin'>${this.transloco.translate(errorKey + '.TITLE')}</h4>
                  <p class='no-margin-bottom'>${this.transloco.translate(errorKey+ '.MESSAGE')}</p>`,
        className: 'xevlabs-auth-snackbar ERROR',
        autoClose: true,
        dismissible: true
      }
    })
  }
}
