import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ToastResponse } from 'src/assets/libs/models/response-callback.model';
import { ResponseType } from 'src/assets/libs/constants/text-constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamService } from '../services/exam.service';
import { ToastService } from '../services/toaster.service';
import { catchError, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ExamModel } from './models/exam.model';
import { DatePipe } from '@angular/common';
import { Utilities } from '../services/utility.service';
import { FilterPaneComponent } from './filter-pane/filter-pane.component';

@Component({
  selector: 'app-manage-exams',
  templateUrl: './manage-exams.component.html',
  styleUrls: ['./manage-exams.component.scss']
})
export class ManageExamsComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  toastMessage: string;
  isSpinner: boolean = false;
  examFilterForm: FormGroup;
  @ViewChild(AddExamComponent, { static: false }) addExam: AddExamComponent;
  @ViewChild('successToast') successToast;
  @ViewChild('failureToast') failureToast;
  @ViewChild(FilterPaneComponent, { static: false }) filterPane: FilterPaneComponent;
  exams: ExamModel[] = [];

  constructor(
    private examService: ExamService
    , private toastService: ToastService
    , private utilityService:Utilities
  ) {
    this.toastService.successToast = this.successToast;
    this.toastService.failureToast = this.failureToast;

  }
  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(): void {
    this.examService.toastSubject.subscribe(data => {
      this.callback(data);
    })
  }

  openAddModal() {
    this.addExam.openInterface('Add');
  }
  callback(response: ToastResponse) {
    console.log(response.message);
    this.toastMessage = response.message;
    this.hideSpinner();
    //timeout/artificial delay for 10ms is added to achieve order of execution b/w previous statements and the upcoming statement
    setTimeout(() => {
      if (response.responseType === ResponseType.Success) {
        this.filterPane.onSubmit();
        let template = this.successToast;
        this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
        this.getInitData();
      }
      else {
        let template = this.failureToast;
        this.toastService.show({ template, classname: 'bg-danger text-light', delay: 10000 });
      }
    }, 10);

  }

  loadSpinner() {
    this.isSpinner = true;
  }

  hideSpinner() {
    this.isSpinner = false;
  }

  filterSubmit(filterForm: any) {
    this.examService.getDataWithFilter(filterForm)
      .pipe(
        map(response=>{
          response.forEach(element => {
            element.applicationLastDate=this.utilityService.formatDate(element.applicationLastDate,'dd-MMM-yyyy');
            element.examDate=this.utilityService.formatDate(element.examDate,'dd-MMM-yyyy');
          });
          return response;
        }),
        catchError((error: HttpErrorResponse) => { return this.examService.handleError(error, 'Error in Fetching Exam Search Details'); })
      )
      .subscribe(data => {
        this.exams = data;
        console.log(this.exams);
      })
  }

  onEdit(editModel:ExamModel){
    this.addExam.examFormSetValue(editModel);
    this.addExam.openInterface('Edit');
  }

  onDelete(exam:ExamModel){
    console.log("ExamModel",exam);
    let submitObj=this.examService.setExamObjectToSubmit(exam,true);
    console.log("submitObj",submitObj);
    this.examService.deleteData(submitObj)
    .pipe(
      catchError((error:HttpErrorResponse)=>{ return this.examService.handleError(error,'Error in Deleting Exam Details'); })
    )
    .subscribe(data=>{
      this.filterPane.onSubmit();
      this.examService.handleSuccess("Exam has been removed!");
    })
  }

  ngOnDestroy(): void {
    this.examService.toastSubject.unsubscribe();
  }

  showToastAndSubscribe(){
    let template = this.successToast;
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
    this.getInitData();
  }
}
