///**
// * Created by tatiana.gorbunova on 03.12.2016.
// */
//import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
//import {LocationStrategy,HashLocationStrategy} from '@angular/common';
//import {BrowserModule} from '@angular/platform-browser';
//import {RouterModule} from  '@angular/router';
//
//import {HttpModule} from '@angular/http';
//
//import {AppComponent}  from './app/app.component';
//
//import {routing} from './app.routes'
//import {MainModule} from "./app/components/main/main.module";
//import {Ng2BootstrapModule, ModalModule, AlertModule} from "ng2-bootstrap";
//import {TranslateModule} from "ng2-translate";
//import {TranslateLoader} from "ng2-translate";
//import {TranslateStaticLoader} from "ng2-translate";
//import {Http} from "@angular/http";
//import {XHRBackend} from "@angular/http";
//import {RequestOptions} from "@angular/http";
//import {Router} from "@angular/router";
//import {Injectable} from "@angular/core";
//import {Headers} from "@angular/http";
//import {ConnectionBackend} from "@angular/http";
//import {Request} from "@angular/http";
//import {RequestOptionsArgs} from "@angular/http";
//import {Observable} from "rxjs";
//import {Response} from "@angular/http";
//import _ = require("lodash");
//import {LOCALE_ID} from "@angular/core";
//import {Ng2PageScrollModule} from "ng2-page-scroll/src/ng2-page-scroll.module";
//
//
//@NgModule({
//    imports: [
//        BrowserModule,
//        HttpModule,
//        RouterModule,
//        MainModule,
//        Ng2BootstrapModule,
//        Ng2PageScrollModule,
//        routing,
//    ],
//    declarations: [
//        AppComponent
//    ],
//    providers: [
//        { provide: Http,
//            useFactory: (
//                backend: XHRBackend,
//                defaultOptions: RequestOptions,
//                router: Router),
//            deps: [XHRBackend, RequestOptions]
//        },
//        { provide: LOCALE_ID, useValue: "ru" },
//        {provide: LocationStrategy, useClass: HashLocationStrategy}],
//    bootstrap: [AppComponent],
//    schemas: [CUSTOM_ELEMENTS_SCHEMA]
//})
//export class AppModule {
//}

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
//services

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
        MeasurementService
    ],
    bootstrap:    [ AppComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }