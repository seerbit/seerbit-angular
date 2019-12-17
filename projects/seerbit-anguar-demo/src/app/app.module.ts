import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgSeerBitModule} from 'seerbit-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,NgSeerBitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
