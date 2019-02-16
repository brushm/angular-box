import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountListComponent } from './web3/account-list/account-list.component';

const routes: Routes = [
  { path: 'web3', loadChildren: './web3/web3.module#Web3Module' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
