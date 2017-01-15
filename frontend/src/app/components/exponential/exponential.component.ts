import {Component} from "@angular/core";
/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
@Component({
    selector: 'exponential-comp',
    template: require("./exponential.tmpl.html"),
    styles: [require("!style!css!sass!../../../assets/css/partial/exponential/exponential.scss").toString()]
})

export class ExponentialComponent {
    constructor() {

    }
}