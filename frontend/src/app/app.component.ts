/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */
import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {Renderer} from "@angular/core";
import {Router} from "@angular/router";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'ls-app',
    template: require('./app.tmpl.html'),
    styles: [require('!style!css!sass!../assets/css/style.scss').toString()],
    encapsulation: ViewEncapsulation.None,

})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;

    constructor(viewContainerRef: ViewContainerRef, private renderer: Renderer, private router: Router, translate : TranslateService) {
        this.viewContainerRef = viewContainerRef;
        translate.addLangs(["ru"]);
        //translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('ru');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/ru/) ? browserLang : 'ru');
    }

}