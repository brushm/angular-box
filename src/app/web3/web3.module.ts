import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { Web3RoutingModule } from './web-routing.module';

@NgModule({
  declarations: [
    AccountListComponent
  ],
  imports: [
    CommonModule,
    Web3RoutingModule
  ],
  exports: []
})
export class Web3Module { }
