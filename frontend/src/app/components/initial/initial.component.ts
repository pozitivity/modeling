import {Component, ViewEncapsulation} from "@angular/core";
import {MeasurementService} from "../../services/MeasurementService";
import {Measurement} from "../../models/measurement.model";
import * as D3 from "d3-selection";
import * as D3Scale from "d3-scale";
import * as D3Shape from "d3-shape";
import * as D3Array from "d3-array";
import * as D3Axis from "d3-axis";
import * as D3TimeFormat from "d3-time-format";
import * as D3Zoom from "d3-zoom";
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
        this.width = this.WIDTH - this.margin.left - this.margin.right;
        this.height = this.HEIGHT - this.margin.top - this.margin.bottom;
    }

    private WIDTH: number = 1050;
    private HEIGHT: number = 600;

    private measurements: Measurement[] = [];

    private svg: any;
    private width: number;
    private height: number;
    private margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };
    private x: any;
    private y: any;
    private line: D3Shape.Line<[any, any]>;
    private parseTime: any;

    ngOnInit() {
        this.measurementService.getMeasurements().subscribe((measurements) => {
            measurements.map(m => this.measurements.push(m));
            this.measurements.map(m => {
                m.timeDisplay = this.parseTimeDisplay(m.time);
            });
            this.initSvg();
            this.initAxis();
            this.drawAxis();
            this.drawLine();
        });
    }

    private initSvg() {
        this.parseTime = D3TimeFormat.timeParse("%dd");
        this.svg = D3.select("svg")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")")
            .call(D3Zoom.zoom().scaleExtent([1, 10]).on("zoom", () => {
                this.svg.attr("transform", "translate(" + D3.event.transform.x + ")" + " scale(" + D3.event.transform.k + ")")
            }))
            .append("g");
    }

    private initAxis() {
        this.x = D3Scale.scaleTime().range([0, this.width]);
        this.y = D3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(D3Array.extent(this.measurements, (d) => d.index ));
        this.y.domain(D3Array.extent(this.measurements, (d) => d.speed ));
    }

    private drawAxis() {
        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(D3Axis.axisBottom(this.x));

        this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(D3Axis.axisLeft(this.y))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Speed");

        // вертикальные линии сетки
        D3.selectAll("g.axis.axis--x g.tick")
            .append("line")
            .classed("grid-line", true) // добавляем класс
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", - (this.height));

        D3.selectAll("g.axis.axis--y g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.width)
            .attr("y2", 0);
    }

    private drawLine() {
        this.line = D3Shape.line()
            .x( (d: any) => {
                return this.x(d.index);
            } )
            .y( (d: any) => {
                return this.y(d.speed);
            } );

        this.svg.append("path")
            .datum(this.measurements)
            .attr("class", "line")
            .attr("d", this.line);

        // функция интерполяции значений на ось Х
        let scaleX: any = D3Scale.scaleLinear()
            .domain([1, 99])
            .range([0, this.width]);

        let scaleY: any = D3Scale.scaleLinear()
            .domain([10.28, 0.23])
            .range([0, this.height]);

        // отметки к точкам
        this.svg.selectAll(".dot")
            .data(this.measurements)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function(d) { return scaleX(d.index); })
            .attr("cy", function(d) { return scaleY(d.speed); });
    }

    private parseTimeDisplay(timeNumber: number) : string {
        let timeString: string = String(timeNumber);
        if (timeString.length > 2) {
            let minutes: string = timeString.substring(0, timeString.length - 2);
            let seconds: string = timeString.substring(timeString.length - 2, timeString.length);
            return minutes + ":" + seconds;
        }
        if (timeString.length == 1) timeString = "0" + timeString;
        return "0:" + timeString;
    }

}