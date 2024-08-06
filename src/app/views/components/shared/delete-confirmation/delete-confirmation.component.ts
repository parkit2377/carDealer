import { Component, OnInit } from '@angular/core';
import { AddUpdateDealerServiceService } from '../services/add-update-dealer-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit{

  constructor( private _addUpdateDealer : AddUpdateDealerServiceService , private dialog : MatDialog){ }

  ngOnInit(): void {
    
  }


  onAccept(){
    this._addUpdateDealer.setDeleteConfirmation(true);
    this.dialog.closeAll();
  }


  onDecline(){
    this._addUpdateDealer.setDeleteConfirmation(false);
    this.dialog.closeAll();
  }

}
