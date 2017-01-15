import {Component, ViewEncapsulation} from "@angular/core";
import {MeasurementService} from "../../services/MeasurementService";
import {Measurement} from "../../models/measurement.model";
import * as D3 from "d3";
/**
 * Created by Tatyana on 14.01.2017.
 */

@Component({
    selector: 'initial-comp',
    template: require('./initial.tmpl.html'),
    styles: [require('!style!css!sass!../../../assets/css/partial/initial/initial.scss').toString()]
})

export class InitialComponent {
    constructor(private measurementService: MeasurementService) {

    }

    private measurements: Measurement[];

    ngOnInit() {
        this.measurementService.getMeasurements().subscribe((measurements) => {
            measurements.map(m => this.measurements.push(m));
            console.log(this.measurements);
            console.log(D3);
        });
    }
}