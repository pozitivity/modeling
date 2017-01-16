import {Injectable} from "@angular/core";
/**
 * Created by Tatyana on 16.01.2017.
 */

@Injectable()
export class AreaChartService {

    private svg: any
    private width: number;
    private height: number;

    public getSvg() { return this.svg; }

    public setSvg(svg: any) { this.svg = svg; }

    public getWidth() { return this.width; }

    public setwidth(width: number) { this.width = width; }

    public getHeight() { return this.height; }

    public setHeight(height: number) { this.height = height; }

    public initSvg() {

    }

    public initAxis() {

    }

    public drawAxis() {

    }

    public drawLine() {

    }
}