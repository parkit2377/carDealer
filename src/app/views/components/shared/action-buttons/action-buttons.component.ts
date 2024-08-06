import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements AgRendererComponent{
  paramsData : any;
  carDetailsButtons : boolean = false;
  constructor(){}


  agInit(params : ICellRendererParams): void {
    this.paramsData = params;

    // To check if the buttons getting rendered in cars view table.

    if (this.paramsData.data.brand != undefined){
      this.carDetailsButtons = true
    }
    
  }


  refresh(): boolean {
    return false
  }



  deleteOption(params : {}){
    this.paramsData.clickDelete(this.paramsData.data );

  }

  viewOption(params : {}){
    this.paramsData.clickView(this.paramsData.data );
    
  }

  editOption(params : {}){
    this.paramsData.clickEdit(this.paramsData.data );
  }


}
