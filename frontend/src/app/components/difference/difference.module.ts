import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DifferenceComponent} from "./difference.component";
/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */

@NgModule({
    imports: [CommonModule],
    exports: [DifferenceComponent],
    declarations: [DifferenceComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DifferenceModule {

}