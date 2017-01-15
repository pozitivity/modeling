import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MainComponent} from "./main.component";
import {InitialComponent} from "../initial/initial.component";

/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */

const routes: Routes  = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'initial',
                component: InitialComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);