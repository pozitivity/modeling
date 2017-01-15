import {BaseEntityService} from "./BaseEntityService";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Measurement} from "../models/measurement.model";


/**
 * Created by Tatyana on 14.01.2017.
 */

@Injectable()
export class MeasurementService extends BaseEntityService {

    private measurementsObservable: Observable<Measurement[]>;

    constructor(private http: Http) {
        super();
    }

    getMeasurements() : Observable<Measurement[]> {
        this.measurementsObservable = this.http.get(this.BACKEND_URL + '/measurement')
            .map(response => response.json());
        return this.measurementsObservable;
    }
}