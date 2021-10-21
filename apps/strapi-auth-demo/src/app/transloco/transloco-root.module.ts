import {HttpClient} from '@angular/common/http';
import {
    TRANSLOCO_LOADER,
    Translation,
    TranslocoLoader,
    TRANSLOCO_CONFIG,
    translocoConfig,
    TranslocoModule, getBrowserLang, HashMap
} from '@ngneat/transloco';
import {Injectable, NgModule} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {
    }

    getTranslation(lang: string): Observable<HashMap> {
        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
}

@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ['en', 'fr'],
                defaultLang: getBrowserLang(),
                fallbackLang: 'fr',
                missingHandler: {
                    useFallbackTranslation: true,
                    logMissingKey: false,
                },
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: environment.production,
            })
        },
        {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader}
    ]
})
export class TranslocoRootModule {
}
