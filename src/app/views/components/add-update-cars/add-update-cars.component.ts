import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddUpdateDealerServiceService } from '../shared/services/add-update-dealer-service.service';

@Component({
  selector: 'app-add-update-cars',
  templateUrl: './add-update-cars.component.html',
  styleUrls: ['./add-update-cars.component.scss']
})
export class AddUpdateCarsComponent implements OnInit{


  newCarForm !: FormGroup;
  carEditOption : boolean = false;
  constructor( private dialog : MatDialog , private _addUpdateDealer : AddUpdateDealerServiceService , @Inject(MAT_DIALOG_DATA) private data: any){


    if (data != null){
      this.carEditOption = true;
    }
    

   }



  ngOnInit(): void {
    this.createNewDealerForm();

    if (this.carEditOption){
      this.data.editCardata.price = parseFloat(this.data.editCardata.price.replace('$',''));
      this.newCarForm.patchValue(this.data.editCardata)
    }

  }


  createNewDealerForm(){
    this.newCarForm = new FormGroup({
      id : new FormControl(""),
      name : new FormControl(null , [Validators.required ,]),
      model : new FormControl(null , [Validators.required ,]),
      brand : new FormControl(null , [Validators.required ,]),
      color : new FormControl(null , [Validators.required ,]),
      price : new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
    })
  }


  onCancel(){
    this._addUpdateDealer.setAddNewCarData(null);
    this.dialog.closeAll();
  }


  addNewCarFunc(){
    let newCarFormVal = this.newCarForm.value;
    newCarFormVal.price = '$' + newCarFormVal.price;
    this._addUpdateDealer.setAddNewCarData(newCarFormVal)
    this.dialog.closeAll();
  }


  editCarFunc(){

    let editCarFormVal = this.newCarForm.value;
    editCarFormVal.price = '$' + editCarFormVal.price;
    this._addUpdateDealer.setAddNewCarData(editCarFormVal);
    this.dialog.closeAll();
  }


  get name() {
    return this.newCarForm.get('name');
  }

}
