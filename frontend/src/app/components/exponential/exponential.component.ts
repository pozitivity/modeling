import {Component} from "@angular/core";
import {ExponentialService} from "../../services/ExponentialService";
import {Measurement} from "../../models/measurement.model";
import * as D3Selection from "d3-selection";
import * as D3Scale from "d3-scale";
import * as D3Shape from "d3-shape";
import * as D3Array from "d3-array";
import * as D3Axis from "d3-axis";
import * as D3TimeFormat from "d3-time-format";
import * as D3Zoom from "d3-zoom";
import * as D3 from "d3";
import {MeasurementService} from "../../services/MeasurementService";
import {Exponential} from "../../models/exponential.model";
/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
@Component({
    selector: 'exponential-comp',
    template: require("./exponential.tmpl.html"),
    styles: [require("!style!css!sass!../../../assets/css/partial/exponential/exponential.scss").toString()]
})

export class ExponentialComponent {
    constructor(private exponentialService: ExponentialService,
                private measurementService: MeasurementService) {
        this.height = this.HEIGHT - this.margin.top - this.margin.bottom;
        this.width = this.WIDTH - this.margin.right - this.margin.right;
    }

    private exponentialData: Exponential [] = [];
    private index: number = 0;
    private measurements: Measurement[] = [];
    private k: number;
    private WIDTH: number = 1050;
    private HEIGHT: number = 600;
    private svg: any;
    private margin = {
        top: 20,
        right: 20,
        left: 30,
        bottom: 50
    };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private line: D3Shape.Line<[any, any]>;

    ngOnInit() {
        this.measurementService.getMeasurements().subscribe(measurements => {
            measurements.map(m => this.measurements.push(m));
            this.initSvg();
            this.initAxis(this.measurements);
            this.drawAxis();
            this.drawLine(this.measurements);
        });
    }

    private loadExponentialData() {
        //this.exponentialData[this.index].exp = [];
        this.exponentialService.getExponentialData(this.k).subscribe((exponentialData) => {
            let e: Exponential = new Exponential();
            e.exp = [];
            exponentialData.map(exp => e.exp.push(exp));
            this.exponentialData.push(e);
            //exponentialData.map(exp => this.exponentialData[this.index].exp.push(exp));
            this.drawLine(this.exponentialData[this.index].exp);
            this.index++;
        })
    }

    private initSvg() {
        this.svg = D3Selection.select("svg")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")")
            .call(D3Zoom.zoom().scaleExtent([1, 10]).on("zoom", () => {
                this.svg.attr("transform", "translate(" + D3Selection.event.transform.x + ")" + " scale(" + D3Selection.event.transform.k + ")")
            }))
            .append("g");
    }

    private initAxis(data: Measurement[]) {
        this.x = D3Scale.scaleTime().range([0, this.width]);
        this.y = D3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(D3Array.extent(data, (d) => d.index ));
        this.y.domain(D3Array.extent(data, (d) => d.speed ));
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
        D3Selection.selectAll("g.axis.axis--x g.tick")
            .append("line")
            .classed("grid-line", true) // добавляем класс
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", - (this.height));

        D3Selection.selectAll("g.axis.axis--y g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.width)
            .attr("y2", 0);
    }

    private drawLine(data: Measurement[]) {

        let color = Math.round((Math.random() * 255)).toString(16) +
            Math.round((Math.random() * 255)).toString(16) +
            Math.round((Math.random() * 255)).toString(16);

        this.line = D3Shape.line()
            .x( (d: any) => this.x(d.index))
            .y( (d: any) => this.y(d.speed));

        this.svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", this.line)
            .style("stroke", color);

        // функция интерполяции значений на ось Х
        let scaleX: any = D3Scale.scaleLinear()
            .domain([1, 99])
            .range([0, this.width]);

        let scaleY: any = D3Scale.scaleLinear()
            .domain([10.28, 0.23])
            .range([0, this.height]);

        // отметки к точкам
        this.svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function(d) { return scaleX(d.index); })
            .attr("cy", function(d) { return scaleY(d.speed); })
            .style("stroke", color)
            .style("fill", "white");
    }

    private clear() {
        this.exponentialData = [];
        this.index = 0;
        this.svg.remove();
        this.initSvg();
        this.initAxis(this.measurements);
        this.drawAxis();
        this.drawLine(this.measurements);
    }
}