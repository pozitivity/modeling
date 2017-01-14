/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */
import {routing} from "./main.route";
import {MainComponent} from "./main.component";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ModalModule, AlertModule, TabsModule} from "ng2-bootstrap";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "ng2-translate";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {TableModule} from "../table/table.module";
import {BubbleModule} from "../bubble/bubble.module";
import {HeaderComponent} from "../header/header.component";

@NgModule({
    imports: [
        routing,
        ModalModule,
        AlertModule,
        TabsModule,
        CommonModule,
        TableModule,
        BubbleModule,
        TranslateModule.forRoot()
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