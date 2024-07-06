import { Component, OnInit, ViewChild } from '@angular/core';
import { AddRecruitmentBodyComponent } from './add-recruitment-body/add-recruitment-body.component';
import { ExamBodyService } from '../services/exam-body.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DropdownModel } from 'src/assets/libs/models/dropdown.model';
import { RecruiterModel } from 'src/assets/libs/models/recruiter.model';
import { ToastService } from '../services/toaster.service';
import { KeyValue } from '@angular/common';
import { Dictionary } from 'src/assets/libs/models/dictionary.model';
import {
  ResponseType
  , notAvailable
  , propertyTypeDate
  , sortDirectionASC
  , sortDirectionDESC } from 'src/assets/libs/constants/text-constants';
import { ToastResponse } from 'src/assets/libs/models/response-callback.model';
import { ConfirmationModalComponent } from 'src/assets/libs/components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-manage-recruitment-bodies',
  templateUrl: './manage-recruitment-bodies.component.html',
  styleUrls: ['./manage-recruitment-bodies.component.scss']
})
export class ManageRecruitmentBodiesComponent implements OnInit {
  recruiterList: RecruiterModel[] = [];
  filteredRecruiterList: RecruiterModel[] = [];
  toastMessage: string = '';
  isAcending: boolean = true;
  isSpinner: boolean = false;
  fields: Dictionary<string> = {
    'id': notAvailable
    , 'name': 'Name'
    , 'modifiedDate': 'Modified Date'
  }
  initialSortField: string = 'DateModified';
  deleteData:RecruiterModel;
  @ViewChild('successToast') successToast;
  @ViewChild('failureToast') failureToast;
  @ViewChild(AddRecruitmentBodyComponent, { static: false }) addRecruiter: AddRecruitmentBodyComponent;
  @ViewChild(ConfirmationModalComponent,{ static: false }) confirmationModal: ConfirmationModalComponent;
  searchText: string = '';
  constructor(
    private examBodyService: ExamBodyService
    , private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(): void {
    this.examBodyService.getData().pipe(
      catchError((error: HttpErrorResponse) => { return this.handleError(error, 'Error in Fetching Recruiter Details'); })
    ).subscribe((data: RecruiterModel[]) => {
      this.recruiterList = data;
      if (this.recruiterList.length > 0) {
        this.filteredRecruiterList = this.sortByDate<RecruiterModel>(this.recruiterList, 'lastModified', propertyTypeDate, sortDirectionDESC);
      }
    });
  }
  openAddModal() {
    this.addRecruiter.openModalInterface('Add');
  }
  handleError(error: any, message: string): any {

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  onEdit(recruiter: RecruiterModel){
    this.addRecruiter.isEdit=true;
    this.addRecruiter.openEditModalInterface('Edit', recruiter);
  }

  searchRecruiterList() {
    this.filteredRecruiterList = this.recruiterList.filter(recruiter => recruiter.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
  }

  sortByDate<T>(objectArray: T[], dateProperty: string, propertyType: string, sortDirection: string): T[] {
    // Sort the array of objects based on the 'date' property
    objectArray.sort((a: T, b: T) => {
      let propertyName: string = dateProperty;
      let dA = this.getValueFromObject(a, propertyName as keyof T);
      let dB = this.getValueFromObject(b, propertyName as keyof T);
      if (propertyType === propertyTypeDate) {
        const dateA = new Date(dA.toString());
        const dateB = new Date(dB.toString());
        return (sortDirection === sortDirectionASC) ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      else{
        return (sortDirection === sortDirectionASC) ? dA.toString().toLocaleLowerCase().localeCompare(dB.toString().toLocaleLowerCase()) : dB.toString().toLocaleLowerCase().localeCompare(dA.toString().toLocaleLowerCase());
      }
    });
    return objectArray;
  }
  getValueFromObject<T>(obj: T, propertyName: keyof T): T[keyof T] {
    return obj[propertyName];
  }

  callback(response: ToastResponse) {
    this.toastMessage = response.message;
    this.hideSpinner();
    if (response.responseType === ResponseType.Success) {
      this.addRecruiter.showSuccess(this.successToast);
      this.getInitData();
    }
    else {
      this.addRecruiter.showDanger(this.failureToast);
    }
  }

  deleteCallback(response: ToastResponse) {
    this.toastMessage = response.message;
    this.hideSpinner();
    if (response.responseType === ResponseType.Success) {
      let template=this.successToast;
      this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
      this.getInitData();
    }
    else {
      let template=this.failureToast;
      this.toastService.show({ template, classname: 'bg-danger text-light', delay: 10000 });
    }
  }

  onDeleteClick(id:string){
    this.deleteData=this.recruiterList.filter(recruiter => recruiter.id === id)[0];
    this.confirmationModal.openModal();
  }

  onDelete(){
    this.loadSpinner();
    this.examBodyService.deleteData({"id":this.deleteData.id,"name":this.deleteData.name}).pipe(
      catchError((error: HttpErrorResponse) => {
        this.hideSpinner();
        this.confirmationModal.closeModal();
        return this.handleError(error, 'Error in deleting Recruiter Entry'); })
    ).subscribe(data => {
      this.hideSpinner();
      this.deleteCallback({ responseType: ResponseType.Success, message: 'Exam Recruiter Entry Successfully Deleted!!' });
      this.confirmationModal.closeModal();
    })
  }
  onCancel(){
    this.confirmationModal.closeModal();
  }

  loadSpinner() {
    this.isSpinner = true;
  }

  hideSpinner() {
    this.isSpinner = false;
  }
}
