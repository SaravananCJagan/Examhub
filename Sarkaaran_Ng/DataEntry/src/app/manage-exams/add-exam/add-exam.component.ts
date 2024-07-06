import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, interval, retryWhen, tap, throwError } from 'rxjs';
import { ExamService } from 'src/app/services/exam.service';
import { ExamBodyService } from 'src/app/services/exam-body.service';
import { ToastService } from 'src/app/services/toaster.service';
import { Utilities } from 'src/app/services/utility.service';
import { SimpleModalComponent } from 'src/app/shared/modal/alert-modal/simple-modal.component';
import { ResponseType, statesList } from 'src/assets/libs/constants/text-constants';
import { DropdownModel } from 'src/assets/libs/models/dropdown.model';
import { ToastResponse } from 'src/assets/libs/models/response-callback.model';
import { ExamModel } from '../models/exam.model';
@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss'],
  providers: [DatePipe]
})
export class AddExamComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  examForm: FormGroup;
  title:string='Add';
  Editor = ClassicEditor;
  isState:boolean = false;
  resetForm:boolean = false;
  states:string[] =statesList;
  examBodies:DropdownModel[] = [];
  isAddNewExamBody:boolean = false;
  selectedBody:string=null;
  editorData:string = '';
  isNoExamBody:boolean = false;
  SubmitComment:string = 'Submit';
  submitDisabled:boolean = false;
  @Output() onResponseCallback:EventEmitter<ToastResponse> = new EventEmitter();
  @Output() afterSubmit:EventEmitter<void> = new EventEmitter();
  @ViewChild(SimpleModalComponent, { static: false }) simpleModal: SimpleModalComponent
  @ViewChild('addExam') addExamModal;

  constructor(
    private formBuilder: FormBuilder
    , private examService: ExamService
    , private examBodyService: ExamBodyService
    , private utilityService: Utilities
    , private modalService: NgbModal
    , private toastService: ToastService
    ) {
    this.examForm = this.formBuilder.group({
      id:[0],
      name: ['', [Validators.required]],
      examBodyId:[''],
      examBody:[],
      examDate: ['', [Validators.required]],
      notificationDate: ['', [Validators.required]],
      applicationLastDate: [''],
      applicationLastTime:[{hour: 23, minute: 59, second:0}],
      examDuration: [''],
      examNotificationLink: ['', [Validators.required]],
      examApplicationLink: [''],
      examAgeLimit: ['', [Validators.required]],
      examEduEligibility: ['', [Validators.required]],
      examVacancy: ['', [Validators.required]],
      examMoreDetails: [''],
      isPhysicalTest: [false],
      isGenderBased: [false],
      gender:[''],
      examCategory: ['', [Validators.required]],
      examState: [''],
      newExamConductingBody:[''],
    });
  }
  ngOnInit(): void {
    this.examBodyService.getData().pipe(
      catchError((error: HttpErrorResponse) => {return this.examBodyService.handleError(error,'Error in Fetching Recruiter Details');})
    ).subscribe((data:DropdownModel[]) => {
      this.examBodies=data;
      if(this.examBodies.length==0){
        this.isNoExamBody=true;
        this.addNewRecruitmentBody();
      }
    });
  }

  onSubmit() {
    this.afterSubmit.emit();
    if (this.examForm.valid) {
      console.log(this.examForm.value);
      this.examForm.value.examDate = this.utilityService.formatDateFromDatePickerObject(this.examForm.value.examDate, "");
      this.examForm.value.notificationDate = this.utilityService.formatDateFromDatePickerObject(this.examForm.value.notificationDate, "");
      this.examForm.value.applicationLastDate = this.utilityService.formatDateFromDatePickerObject(this.examForm.value.applicationLastDate, this.examForm.value.applicationLastTime);
      console.log(this.examForm.value);
      if (this.examForm.value.id !== null && this.examForm.value.id !== '' && this.examForm.value.id !== 0) {
        this.examService.updateData(this.examForm.value).pipe(
          catchError((error: HttpErrorResponse) => { return this.examService.handleError(error, 'Exam Details Not Updated due to SERVER ERROR, kindly contact administrator if it is not a duplicate entry') })
        ).subscribe(data => {
          this.onResponseCallback.emit({ responseType: ResponseType.Success, message: 'Exam Details Successfully Updated!!' });
          this.onReset();
          this.modalService.dismissAll();
        });
        return;
      }
      this.examForm.value.id=0;
      this.examService.postData(this.examForm.value).pipe(
        catchError((error: HttpErrorResponse) => { return this.examService.handleError(error, 'Exam Details Not Inserted due to SERVER ERROR OR DUPLICATE entry, kindly contact administrator if it is not a duplicate entry') })
      ).subscribe(data => {
        this.onResponseCallback.emit({ responseType: ResponseType.Success, message: 'Exam Details Successfully Inserted!!' });
        this.onReset();
        this.modalService.dismissAll();
      });
    }
    else {
      this.onResponseCallback.emit({responseType: ResponseType.Failure,message: 'Invalid Details!'});
      console.log(this.examForm);
    }
  }

  setCategory(category: string) {
    console.log(category);
    this.examForm.get('examCategory').setValue(category);
    this.isState=category.toLowerCase() === 'state';
    event.preventDefault();
  }

  setState(State: string) {
    this.examForm.get('examState').setValue(State);
    event.preventDefault();
  }

  setExamBody(examBody: DropdownModel) {
    this.examForm.get('examBodyId').setValue(examBody.id);
    this.selectedBody = examBody.name;
    this.examForm.get('examBody').setValue(examBody);
    event.preventDefault();
  }

  setFGValue(fgName:string, value: string) {
    this.examForm.get(fgName).setValue(value);
    event.preventDefault();
  }

  onReset() {
    this.resetForm=true;
    this.examForm.setValue({
      id:'',
      name: '',
      examBodyId:'',
      examBody:'',
      examDate: '',
      notificationDate: '',
      applicationLastDate: '',
      applicationLastTime:{hour: 23, minute: 59, second:0},
      examDuration: '',
      examNotificationLink: '',
      examApplicationLink: '',
      examAgeLimit: '',
      examEduEligibility: '',
      examVacancy: '',
      examMoreDetails: '',
      examCategory: '',
      examState: '',
      isPhysicalTest: false,
      isGenderBased: false,
      gender:'',
      newExamConductingBody:'',
    })
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'});
  }
  openInterface(title:string){
    this.title=title;
    this.open(this.addExamModal);
  }
  closeModal() {
    this.modalService.dismissAll();
    this.onReset();
  }

  addNewRecruitmentBody(){
    this.isAddNewExamBody=true;
    this.submitDisabled = true;
    this.SubmitComment="Save/Cancel the new Recruitment Body, then submit";
  }
  cancelRecruitmentBody(){
    this.examForm.get('newExamConductingBody').setValue('');
    this.isAddNewExamBody=false;
    this.submitDisabled = false;
    this.SubmitComment="Submit";
  }
  submitNewRecruitmentBody(){
    this.afterSubmit.emit();
    this.examBodyService.postData({'Name':this.examForm.value.newExamConductingBody}).pipe(
      catchError((error:HttpErrorResponse)=>{return this.examBodyService.handleError(error,'Failed to Create New Exam Body, Possibly duplicate. If not please contact administrator.')}))
      .subscribe(data=>{
        console.log(data)
        let newRecruitmentBody=data;
        let newExamBodyModel={name:newRecruitmentBody.name, id:newRecruitmentBody.id};
        this.examBodies.push(newExamBodyModel);
        this.setExamBody(newExamBodyModel);
        this.cancelRecruitmentBody();
        this.onResponseCallback.emit({responseType: ResponseType.Success,message: 'Exam Recruitment Body Successfully Added!!'});
      });
  }

  public onCkEditorChange({ editor }: ChangeEvent) {
    const data = editor.data.get();
    this.examForm.value.examMoreDetails=data;
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-danger text-light', delay: 10000 });
  }

  openEditModalInterface(title: string, examModel: ExamModel) {
    this.title = title;
    this.examFormSetValue(examModel);
  }

  examFormSetValue(examModel:ExamModel){
    this.examForm.setValue(this.examService.setExamObjectToSubmit(examModel,false));
  }
}
