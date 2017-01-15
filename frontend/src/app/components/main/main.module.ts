import {routing} from "./main.route";
import {MainComponent} from "./main.component";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ModalModule} from "ng2-bootstrap/modal";
import {AlertModule} from "ng2-bootstrap/alert";
import {TabsModule} from "ng2-bootstrap/tabs";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "ng2-translate";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {InitialModule} from "../initial/initial.module";
import {HeaderComponent} from "../header/header.component";

/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */

@NgModule({
    imports: [
        routing,
        ModalModule,
        AlertModule,
        TabsModule,
        CommonModule,
        TranslateModule.forRoot(),
        InitialModule
    ],
    declarations: [
        MainComponent,
        SidebarComponent,
        HeaderComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {
}