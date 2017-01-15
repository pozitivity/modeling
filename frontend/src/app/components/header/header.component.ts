import {Component} from "@angular/core";
/**
 * Created by Tatyana on 15.01.2017.
 */
@Component({
    selector: 'header-comp',
    template: require('./header.tmpl.html'),
    styles: [require("!style!css!sass!../../../assets/css/partial/header/header.scss").toString()]
})
export class HeaderComponent {

}