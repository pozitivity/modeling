import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MainComponent} from "./main.component";
import {InitialComponent} from "../initial/initial.component";
import {DifferenceComponent} from "../difference/difference.component";
import {ExponentialComponent} from "../exponential/exponential.component";

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
            },
            {
                path: 'difference',
                component: DifferenceComponent
            },
            {
                path: 'exponential',
                component: ExponentialComponent
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);