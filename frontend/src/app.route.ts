/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./app/components/main/main.component";

const routes: Routes  = [
    {
        path: '',
        component: MainComponent
    }
];

export const appRouteProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);