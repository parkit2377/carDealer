import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ActionButtonsComponent } from '../shared/action-buttons/action-buttons.component';
import { AddUpdateDealerServiceService } from '../shared/services/add-update-dealer-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateCarsComponent } from '../add-update-cars/add-update-cars.component';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-dealership-details',
  templateUrl: './dealership-details.component.html',
  styleUrls: ['./dealership-details.component.scss']
})
export class DealershipDetailsComponent implements OnInit{
  gridApi: any;
  grid_value: any;
  gridColumnApi: any;
  paginationPageSize: number = 0;
  search_value  : string = '';
  recordCount : number = 0;
  rowData : any[] = [];



  colDefs : any = [
    {
      headerName: "S.no",
      field: "serialNo",
      sortable: true,
      filter: true,
      // flex : 1,
      width : 220,
      valueGetter: "node.rowIndex + 1"
      
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      // flex : 1,
      width : 220,
      
    },
    {
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true,
      // flex : 1,
      width : 220,
            
    },
    {
      headerName: "Brand",
      field: "brand",
      sortable: true,
      filter: true,
      // flex : 1,
      width : 220,
      
    },
    {
      headerName: "Color",
      field: "color",
      sortable: true,
      filter: true,
      // flex : 1,
      width : 220,
      
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
      // flex : 1,
      width : 220,
      
    },
    {
      headerName: "Actions",
      field: "actionButtons",
      sortable: true,
      filter: true,
      width : 300,
      // flex : 1,
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {
        
        clickDelete: (data: any,) => {
          this.deleteCar(data);

        }
        ,
        clickEdit: (data: any) => {
          this.editCar(data)
        },
        type: 'selfupload'
      }
    },
  ]

  


  constructor( private cdRef : ChangeDetectorRef ,  private _addUpdateDealer : AddUpdateDealerServiceService , private router : Router , private dialog : MatDialog){ 
    let getdealerDetails : any = this._addUpdateDealer.getDealerViewDetails();
    let dealerDetails = getdealerDetails.source._value;
    
    this.rowData = dealerDetails?.cars;
    
  }


  ngOnInit(): void {
      this.getRowCount();
  }




  
  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true
    },
    
    suppressDragLeaveHidesColumns: true,
    enableBrowserTooltips: true,

  };


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.grid_value = params.api;
    this.gridColumnApi = params.columnApi;
    this.paginationPageSize = 10;
    this.gridApi.sizeColumnsToFit(); 

  }

  getRowCount(){
    this.recordCount = this.rowData?.length;
  }



  search_func(params: any) {
    this.grid_value.setQuickFilter(this.search_value)
  }



  editCar(param : any){
    sessionStorage.setItem("carId" , param.id)
    const index = this.rowData.findIndex(ele => ele.id == param.id);
    let editCarDialog = this.dialog.open(AddUpdateCarsComponent,{
      height : "500px",
      width : "700px",
      disableClose: true,
      data :{editCardata : param} ,
    })

    editCarDialog.afterClosed().subscribe(res =>{
      let getEditCarData : any = this._addUpdateDealer.getAddNewCarData();
      let editCarData = getEditCarData.source._value;
      if(editCarData != null){
        let carId = sessionStorage.getItem("carId")
        editCarData['id'] = carId
      this.rowData[index] = editCarData;
      
      this.gridApi.setGridOption('rowData', this.rowData);
        this.cdRef.detectChanges();
    }
    })

  }


  deleteCar(param : any){
    const index = this.rowData.findIndex(ele => ele.id == param.id)

    if (index != -1) {
      let deleteConfirmDialog = this.dialog.open(DeleteConfirmationComponent, {
        height: "150px",
        width: "500px",
      })
      deleteConfirmDialog.afterClosed().subscribe(res => {
        let response: any = this._addUpdateDealer.getDeleteConfirmation();
        let confirmationRes = response.source._value;

        if (confirmationRes) {
          this.rowData.splice(index, 1)
          this.gridApi.setGridOption('rowData', this.rowData);
          this.cdRef.detectChanges();
          this.getRowCount();
        }
      });
    }
    
    
  }


  onBack(){

    sessionStorage.setItem("carByDealerId" , JSON.stringify(this.rowData));
    this.router.navigateByUrl('')
  }


  addNewCar(){
    let addCarDialog = this.dialog.open(AddUpdateCarsComponent,{
      height : "500px",
      width : "700px",
      disableClose: true
    })
    addCarDialog.afterClosed().subscribe(res=>{
      let getAddNewCarData : any = this._addUpdateDealer.getAddNewCarData();
      let addNewCarData  = getAddNewCarData.source._value;
      if (addNewCarData != null){
      if (this.rowData.length == 0){
          addNewCarData['id'] = 1001
      }else{
        addNewCarData['id'] = this.rowData[this.rowData.length - 1].id + 1;
      } 
        this.rowData.push(addNewCarData)
        this.gridApi.setGridOption('rowData', this.rowData);
        this.cdRef.detectChanges();
        this.getRowCount();
      }
   
    })

  }

}
