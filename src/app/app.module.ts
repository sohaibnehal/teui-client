import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  NgbModule,
  NgbActiveModal,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';

// components
import * as fromComponents from '../components';

// containers
import * as fromContainers from '../containers';

// services
import * as fromServices from '../services';

@NgModule({
  declarations: [
    AppComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [...fromContainers.containers, ...fromComponents.components],
  entryComponents: [fromComponents.InputFormModalComponent]
})
export class AppModule {}
