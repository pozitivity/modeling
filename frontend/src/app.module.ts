
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Router} from  '@angular/router';
import {HttpModule, Http, RequestOptions, XHRBackend} from '@angular/http';
import {Ng2BootstrapModule, ModalModule, AlertModule} from "ng2-bootstrap";
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {TranslateModule} from "ng2-translate";
import {TranslateLoader} from "ng2-translate";
import {TranslateStaticLoader} from "ng2-translate";

import {routing} from './app.route.ts';
// components
import {AppComponent}  from './app/app.component';
// modules
import {MainModule} from "./app/components/main/main.module";
import {MeasurementService} from "./app/services/MeasurementService";
import {ExponentialService} from "./app/services/ExponentialService";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        RouterModule,
        MainModule,
        Ng2BootstrapModule,
        routing,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    declarations: [ AppComponent ],
    providers: [
        {provide: LOCALE_ID, useValue: "ru"},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        MeasurementService,
        ExponentialService
    ],
    bootstrap:    [ AppComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }