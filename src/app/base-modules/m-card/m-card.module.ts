import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MCardComponent } from "./containers/m-card/m-card.component";
import { TooltipModule } from "primeng/tooltip";


@NgModule({
  declarations: [
    MCardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
  ],
  exports: [
    MCardComponent
  ]
})
export class MCardModule { }
