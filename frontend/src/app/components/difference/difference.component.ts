import {Component} from "@angular/core";
/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */

@Component({
    selector: 'difference-comp',
    template: require('./difference.tmpl.html'),
    styles: [require("!style!css!sass!../../../assets/css/partial/difference/difference.scss").toString()]
})

export class DifferenceComponent {
    constructor() {

    }
}