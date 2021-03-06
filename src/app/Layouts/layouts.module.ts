import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { HeaderComponent } from "./header/header.component";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [NavigationBarComponent, SideBarComponent, HeaderComponent],
  imports: [CommonModule, ControlsModule, RouterModule],
  exports: [HeaderComponent]
})
export class LayoutsModule {}
