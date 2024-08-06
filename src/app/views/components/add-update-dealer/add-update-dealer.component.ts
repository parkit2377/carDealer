import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddUpdateDealerServiceService } from '../shared/services/add-update-dealer-service.service';

@Component({
  selector: 'app-add-update-dealer',
  templateUrl: './add-update-dealer.component.html',
  styleUrls: ['./add-update-dealer.component.scss']
})
export class AddUpdateDealerComponent implements OnInit{

  newDealerForm !: FormGroup;
  ifEditDealer : boolean = false;
  constructor(private dialog : MatDialog , private _addUpdateDealer : AddUpdateDealerServiceService , @Inject(MAT_DIALOG_DATA) private data: any){
    if (data != null){
      this.ifEditDealer = true;
    }
    
  }

  ngOnInit(): void {
    this.createNewDealerForm();
    if (this.ifEditDealer){
      this.data.editDealerdata.remainingBudget = parseFloat(this.data.editDealerdata.remainingBudget.replace('$', ''));
      this.data.editDealerdata.totalBudget = parseFloat(this.data.editDealerdata.totalBudget.replace('$', ''));
    this.newDealerForm.patchValue(this.data.editDealerdata)
    }
  }

  onCancel(){
    this._addUpdateDealer.setAddNewDealerData(null);
    this.dialog.closeAll();
  }


  createNewDealerForm(){
    this.newDealerForm = new FormGroup({
      id : new FormControl(""),
      dealerName : new FormControl(null , [Validators.required]),
      location : new FormGroup({
        longitude : new FormControl(null , [Validators.required]),
        latitude : new FormControl(null , [Validators.required]),
      }),     
      totalBudget : new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
      remainingBudget : new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
      owner : new FormGroup({
        firstName : new FormControl(null , [Validators.required]),
        lastName : new FormControl(null , [Validators.required]),
      }),
      cars : new FormControl([]),
    })
  }


  addDealerFunc(){
    let formVal = this.newDealerForm.value;
    formVal.totalBudget = '$' + formVal.totalBudget;
    formVal.remainingBudget = '$' + formVal.remainingBudget;
    this._addUpdateDealer.setAddNewDealerData(formVal)
    this.dialog.closeAll();
  }


  editDealerFunc(){
    let formVal = this.newDealerForm.value;
    formVal.totalBudget = '$' + formVal.totalBudget;
    formVal.remainingBudget = '$' + formVal.remainingBudget;
    this._addUpdateDealer.setAddNewDealerData(formVal);
    this.dialog.closeAll();
  }

}
