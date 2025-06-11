import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../layout/admin-layout/admin-layout.component";
import { DashboardComponent } from "../pages/admin/dashboard/dashboard.component";

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
]