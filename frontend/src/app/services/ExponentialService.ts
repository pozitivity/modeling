import {BaseEntityService} from "./BaseEntityService";
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Measurement} from "../models/measurement.model";

/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */

@Injectable()
export class ExponentialService extends BaseEntityService {
    private exponentialObservable: Observable<Measurement[]>;

    constructor(private http: Http) {
        super();
    }

    getExponentialData(k: number) : Observable<Measurement[]> {
        let params = new URLSearchParams();
        params.set("k", String(k));
        this.exponentialObservable = this.http.get(this.BACKEND_URL + "/exponential?k=" + k)
            .map(response => response.json())
            .catch(this.handleError);
        return this.exponentialObservable;
    }
}