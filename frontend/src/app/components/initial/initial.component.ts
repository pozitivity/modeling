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

    private measurements: Measurement[] = [];
    private svg: any;

    ngOnInit() {
        this.measurementService.getMeasurements().subscribe((measurements) => {
            measurements.map(m => this.measurements.push(m));
        });

        this.initSvg();
    }

    private initSvg() {
        this.svg = D3.select("svg")
            .append("g")
            .attr("transform", "translate(" + 50 + "," + 20 + ")");
    }
}