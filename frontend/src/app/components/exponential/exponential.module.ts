import {CommonModule} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {ExponentialComponent} from "./exponential.component";

/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
@NgModule({
    imports: [CommonModule],
    exports: [ExponentialComponent],
    declarations: [ExponentialComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ExponentialModule {

}