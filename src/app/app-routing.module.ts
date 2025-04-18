import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TransactionComponent } from './transaction/transaction.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryComponent } from './history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {path:'home', component:NavbarComponent},
  {path:'form',component:TransactionComponent},
  {path:'history',component:HistoryComponent},
  {path:'dashbord',component:DashboardComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
