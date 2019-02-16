import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Web3Module } from './web3/web3.module';
import { Web3Service } from './web3/web3.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Web3Module
  ],
  providers: [ Web3Service ],
  bootstrap: [AppComponent]
})
export class AppModule { }
