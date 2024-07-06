import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { catchError, throwError } from 'rxjs';
import { ExamBodyService } from 'src/app/services/exam-body.service';
import { Utilities } from 'src/app/services/utility.service';
import { ResponseType } from 'src/assets/libs/constants/text-constants';
import { DropdownModel } from 'src/assets/libs/models/dropdown.model';
import { ToastResponse } from 'src/assets/libs/models/response-callback.model';

@Component({
  selector: 'app-filter-pane',
  templateUrl: './filter-pane.component.html',
  styleUrls: ['./filter-pane.component.scss']
})
export class FilterPaneComponent implements OnInit {
  filterForm: FormGroup;
  examBodies: DropdownModel[] = [];
  selectedBody: string = null;
  @Output() submitEvent: EventEmitter<any>= new EventEmitter<any>();
  @Output() onResponseCallback: EventEmitter<ToastResponse> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder
    , private utilityService: Utilities
    , private examBodyService: ExamBodyService
    , private calendar: NgbCalendar) {
    this.filterForm = this.formBuilder.group({
      examBody: [''],
      examFromDate: [''],
      examToDate: [''],
      notificationFromDate: [''],
      notificationToDate: [''],
      applicationLastDateFrom: [this.calendar.getToday()],
      applicationLastDateTo: [''],
      examAgeLimit: [''],
      examVacancy: [''],
      isPhysicalTest: [false],
      gender: [''],
    });

    this.examBodyService.getData().pipe(
      catchError((error: HttpErrorResponse) => { return this.handleError(error, 'Error in Fetching Recruiter Details'); })
    ).subscribe((data: DropdownModel[]) => {
      this.examBodies = data;
    });
  }

  ngOnInit(): void {
    this.submitForm();
  }

  onSubmit() {
    this.submitForm();
  }

  formatDateValues(date: any) :string {
    if (date !== null && date !== '' && date !== undefined) {
      if(date.month===undefined)
        date=this.utilityService.toNgbDate(date);
      return this.utilityService.formatDateFromDatePickerObject(date, "");
    }
    return null;
  }

  formatFilterFormValues(formObj:any){
    formObj.examFromDate = this.formatDateValues(formObj.examFromDate);
    formObj.examToDate = this.formatDateValues(formObj.examToDate);
    formObj.notificationFromDate = this.formatDateValues(formObj.notificationFromDate);
    formObj.notificationToDate = this.formatDateValues(formObj.notificationToDate);
    formObj.applicationLastDateFrom = this.formatDateValues(formObj.applicationLastDateFrom);
    formObj.applicationLastDateTo = this.formatDateValues(formObj.applicationLastDateTo);
  }

  handleError(error: any, UiMessage: string) {
    this.onResponseCallback.emit({ responseType: ResponseType.Failure, message: UiMessage });
    console.log(error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  setExamBody(examBody: DropdownModel) {
    this.filterForm.get('examBody').setValue(examBody.id);
    this.selectedBody = examBody.name;
    event.preventDefault();
  }

  setFGValue(fgName:string, value: string) {
    this.filterForm.get(fgName).setValue(value);
    event.preventDefault();
  }

  getDateValue(){
    console.log(this.filterForm.get('examFromDate').value);
  }

  submitForm(){
    let formObj=this.filterForm.value;
    this.formatFilterFormValues(formObj);
    this.submitEvent.emit(formObj);
  }
}
