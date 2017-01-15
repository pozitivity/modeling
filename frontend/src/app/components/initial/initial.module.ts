import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InitialComponent} from "./initial.component";
/**
 * Created by Tatyana on 14.01.2017.
 */

@NgModule({
    imports: [CommonModule],
    exports: [InitialComponent],
    declarations: [InitialComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class InitialModule {}