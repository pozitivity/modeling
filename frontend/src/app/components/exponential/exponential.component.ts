import {Component} from "@angular/core";
import {ExponentialService} from "../../services/ExponentialService";
import {Measurement} from "../../models/measurement.model";
/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
@Component({
    selector: 'exponential-comp',
    template: require("./exponential.tmpl.html"),
    styles: [require("!style!css!sass!../../../assets/css/partial/exponential/exponential.scss").toString()]
})

export class ExponentialComponent {
    constructor(private exponentialService: ExponentialService) {

    }

    private exponentialData: Measurement[] = [];

    ngOnInit() {
        this.exponentialService.getExponentialData(0.2).subscribe((exponentialData) => {
            exponentialData.map(exp => this.exponentialData.push(exp));
        });
    }
}