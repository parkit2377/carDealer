import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActionButtonsComponent } from '../shared/action-buttons/action-buttons.component';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateDealerComponent } from '../add-update-dealer/add-update-dealer.component';
import { AddUpdateDealerServiceService } from '../shared/services/add-update-dealer-service.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation/delete-confirmation.component';
import { ScreenService } from '../shared/services/screen.service';

@Component({
  selector: 'app-user-dealership',
  templateUrl: './user-dealership.component.html',
  styleUrls: ['./user-dealership.component.scss']
})
export class UserDealershipComponent implements OnInit {



  search_value: string = '';
  gridApi: any;
  paginationPageSize: number = 0;
  gridColumnApi: any;
  grid_value: any;
  recordCount: number = 0;
  screenWidth : number|undefined;
  redback : boolean = false;
  colDefs: any = [
    {
      headerName: "S.no",
      field: "serialNo",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,
      valueGetter: "node.rowIndex + 1"

    },
    {
      headerName: "Name",
      field: "dealerName",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,

    },
    {
      headerName: "Amount Of Cars",
      // field: "cars",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,
      valueGetter: (params: any) => {

        return params.data.cars?.length;
      },


    },
    {
      headerName: "Total Budget",
      field: "totalBudget",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,

    },
    {
      headerName: "Remaining Budget",
      field: "remainingBudget",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,

    },
    {
      headerName: "Longitude",
      field: "location.longitude",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,

    },
    {
      headerName: "Latitude",
      field: "location.latitude",
      sortable: true,
      filter: true,
      // flex : 1,
      width: 220,

    },
    {
      headerName: "Actions",
      field: "actionButtons",
      sortable: true,
      filter: true,
      width: 300,
      // flex : 1,
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {

        clickDelete: (data: any, ssoId: any, action: any) => {
          this.deleteDealer(data);

        },
        clickView: (data: any, ssoId: any, action: any) => {
          this.viewDealer(data);

        }
        ,
        clickEdit: (data: any) => {
          this.editDealer(data)
        },
        type: 'selfupload'
      }
    },
  ]

  rowData = [
    // {
    //   "dealers": [
    {
      "id": 1003,
      "dealerName": "Ford",
      "totalBudget": "$1525",
      "remainingBudget": "$2700",
      "owner": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "location": {
        "latitude": "46545.45",
        "longitude": "4655.245"
      },
      "cars": [
        {
          "id": 1001,
          "name": "Ford EcoSport",
          "model": "2020",
          "brand": "Ford",
          "color": "Silver",
          "price": "$5452"
        },
        {
          "id": 1002,
          "name": "Ford Figo",
          "model": "2018",
          "brand": "Ford",
          "color": "White",
          "price": "$542"
        }
      ]
    },

    {
      "id": 1004,
      "dealerName": "TATA",
      "totalBudget": "$152123",
      "remainingBudget": "$271230",
      "owner": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "location": {
        "latitude": "46545.45",
        "longitude": "4655.245"
      },
      "cars": [
        {
          "id": 1001,
          "name": "Ford EcoSport",
          "model": "2020",
          "brand": "Ford",
          "color": "Silver",
          "price": "$5412352"
        },
        {
          "id": 1002,
          "name": "Ford Figo",
          "model": "2018",
          "brand": "Ford",
          "color": "White",
          "price": "$521342"
        },
        {
          "id": 1003,
          "name": "Ford Figo",
          "model": "2018",
          "brand": "Ford",
          "color": "White",
          "price": "$521342"
        }
      ]
    }
    //     ]
    // }
  ]


  constructor(private dialog: MatDialog, private _addUpdateDealer: AddUpdateDealerServiceService, private cdRef: ChangeDetectorRef,
    private router: Router , private screenService: ScreenService) {


      // To check if the list was updated other than the static data given at initilization.
      let getUpdateDealerList : any = sessionStorage.getItem("updatedDealerList");
      
      if (getUpdateDealerList != null){
        this.rowData = JSON.parse(getUpdateDealerList);
        
      }
      
      }
      

  ngOnInit() {

 

    let dealerIdFromView : any = sessionStorage.getItem("viewDealerId")
        let dealerViewIndex = this.rowData.findIndex(ele => ele.id == dealerIdFromView)
      if (dealerViewIndex != -1){
        let getCarsByDealerId : any = sessionStorage.getItem("carByDealerId");
        
        let carsByDealerId = JSON.parse(getCarsByDealerId)


        this.rowData[dealerViewIndex].cars = carsByDealerId;
        

      }

    this.getRowCount();

  }




  getRowCount() {
    this.recordCount = this.rowData.length;
  }




  addNewDealer() {

    let addDealerDialog = this.dialog.open(AddUpdateDealerComponent, {
      height: "550px",
      width: "700px",
      disableClose: true
    });

    addDealerDialog.afterClosed().subscribe(res => {
      let getAddDealerData: any = this._addUpdateDealer.getAddNewDealerData();
      let resFromAddDealerDialog = getAddDealerData.source._value

      if (resFromAddDealerDialog != null) {

        // Initializing dealers with 0 cars when added.
        resFromAddDealerDialog['cars'] = [];

        // To generate a Id for all new Dealers 

        if (this.rowData.length == 0) {
          resFromAddDealerDialog['id'] = 1001;
        } else {
          resFromAddDealerDialog['id'] = this.rowData[this.rowData.length - 1].id + 1;
        }


        this.rowData.push(resFromAddDealerDialog);
        sessionStorage.setItem("updatedDealerList" ,JSON.stringify(this.rowData))
        this.gridApi.setGridOption('rowData', this.rowData);
        this.cdRef.detectChanges();
        this.getRowCount();

      }
    })

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



  search_func(params: any) {
    this.grid_value.setQuickFilter(this.search_value)
  }



  deleteDealer(param: any) {
    const index = this.rowData.findIndex(ele => ele.id == param.id);

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

  viewDealer(param: any) {
    sessionStorage.setItem("viewDealerId", param.id)
    this._addUpdateDealer.setDealerViewDetails(param);

    this.router.navigateByUrl('/dealer-details')


  }

  editDealer(param: any) {
    sessionStorage.setItem("dealerId", param.id)
    const index = this.rowData.findIndex(ele => ele.id == param.id)

    let editDealerDialog = this.dialog.open(AddUpdateDealerComponent, {
      height: "500px",
      width: "700px",
      disableClose: true,
      data: { editDealerdata: param },
    })

    editDealerDialog.afterClosed().subscribe(res => {

      let getEditDealerData: any = this._addUpdateDealer.getAddNewDealerData();
      let newEditDealerData = getEditDealerData.source._value;
      if (newEditDealerData != null) {
        let dealerId = sessionStorage.getItem("dealerId")
        newEditDealerData['id'] = dealerId;
        this.rowData[index] = newEditDealerData;
        this.gridApi.setGridOption('rowData', this.rowData);
        this.cdRef.detectChanges();
      }
    })

  }

}
