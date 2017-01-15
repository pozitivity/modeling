/**
 * Created by Tatyana on 14.01.2017.
 */
import {Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";

export class BaseEntityService {
    protected headers:Headers;
    protected options:RequestOptions;
    protected BACKEND_URL = "http://localhost:8080/wind/api";

    constructor(){
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({headers: this.headers});
    }
    protected handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}