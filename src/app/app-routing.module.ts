import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDealershipComponent } from './views/components/user-dealership/user-dealership.component';
import { DealershipDetailsComponent } from './views/components/dealership-details/dealership-details.component';

const routes: Routes = [

{path : '' , component : UserDealershipComponent},

{ path : 'dealer-details' , component : DealershipDetailsComponent ,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
