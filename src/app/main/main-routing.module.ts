import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardComponent } from "../Users/dashboard/dashboard.component";
import { MainComponent } from "./main.component";
import { UserEditComponent } from "../Users/edit/edit.component";

const routes: Routes = [
  {
    path: "default",
    component: MainComponent,
    children: [
      { path: "users", component: UserDashboardComponent },
      { path: "users/add", component: UserEditComponent },
      { path: "users/:id/edit", component: UserEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}