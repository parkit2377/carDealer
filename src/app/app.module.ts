import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDealershipComponent } from './views/components/user-dealership/user-dealership.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonsComponent } from './views/components/shared/action-buttons/action-buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateDealerComponent } from './views/components/add-update-dealer/add-update-dealer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DealershipDetailsComponent } from './views/components/dealership-details/dealership-details.component';
import { AddUpdateCarsComponent } from './views/components/add-update-cars/add-update-cars.component';
import { DeleteConfirmationComponent } from './views/components/shared/delete-confirmation/delete-confirmation.component';
// import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from "@angular/material";
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    UserDealershipComponent,
    ActionButtonsComponent,
    AddUpdateDealerComponent,
    DealershipDetailsComponent,
    AddUpdateCarsComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatListModule,
    // MatIconModule,
    // MatButtonModule,
    // FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
