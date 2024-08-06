import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUpdateDealerServiceService {

  private addNewDealerData = new BehaviorSubject<any>(null);

  private dealerViewDetails = new BehaviorSubject<any>(null);

  private addNewCarData = new BehaviorSubject<any>(null);

  private deleteConfirmation = new BehaviorSubject<any>(null);


  constructor() { }


  getAddNewDealerData(): Observable<any> {
    return this.addNewDealerData.asObservable();
  }

  setAddNewDealerData(param: any): void {
    
    this.addNewDealerData.next(param);
  }


  getAddNewCarData(): Observable<any> {
    return this.addNewCarData.asObservable();
  }

  setAddNewCarData(param: any): void {
    
    this.addNewCarData.next(param);
  }


  getDealerViewDetails(): Observable<any> {
    return this.dealerViewDetails.asObservable();
  }

  setDealerViewDetails(param: any): void {
    
    this.dealerViewDetails.next(param);
  }

  getDeleteConfirmation(): Observable<any> {
    return this.deleteConfirmation.asObservable();
  }

  setDeleteConfirmation(param: any): void {
    
    this.deleteConfirmation.next(param);
  }




}
