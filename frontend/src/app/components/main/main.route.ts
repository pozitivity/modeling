/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MainComponent} from "./main.component";
import {TableComponent} from "../table/table.component";
import {BubbleComponent} from "../bubble/bubble.component";

const routes: Routes  = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'table',
                component: TableComponent
            },
            {
                path: 'bubble',
                component: BubbleComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);