import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "../layout/containers/main-layout/main-layout.component";

const routes: Routes = [
    {
        path: 'charts',
        loadChildren: () =>
            import('./chart-demo/chart-demo.module').then((m) => m.ChartDemoModule),
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }