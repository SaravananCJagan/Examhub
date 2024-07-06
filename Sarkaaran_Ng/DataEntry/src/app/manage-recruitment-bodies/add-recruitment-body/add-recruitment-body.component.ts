import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, throwError } from 'rxjs';
import { ExamBodyService } from 'src/app/services/exam-body.service';
import { ToastService } from 'src/app/services/toaster.service';
import { ContentProjectedModalComponent } from 'src/assets/libs/components/modals/content-projected-modal/content-projected-modal.component';
import { ResponseType } from 'src/assets/libs/constants/text-constants';
import { RecruiterModel } from 'src/assets/libs/models/recruiter.model';
import { ToastResponse } from 'src/assets/libs/models/response-callback.model';

@Component({
  selector: 'app-add-recruitment-body',
  templateUrl: './add-recruitment-body.component.html',
  styleUrls: ['./add-recruitment-body.component.scss']
})
export class AddRecruitmentBodyComponent {
  recruiterForm: FormGroup;
  title: string = 'Add';
  isEdit: boolean = false;
  @Output() onResponseCallback: EventEmitter<ToastResponse> = new EventEmitter();
  @Output() afterSubmit: EventEmitter<void> = new EventEmitter();
  @ViewChild(ContentProjectedModalComponent, { static: false }) contentProjectedModal: ContentProjectedModalComponent;
  constructor(
    private readonly formBuilder: FormBuilder
    , private readonly examBodyService: ExamBodyService
    , private toastService: ToastService
    , private modalService: NgbModal
  ) {
    this.recruiterForm = formBuilder.group({
      id:[0],
      name: ['', Validators.required]
    });
  }

  openModalInterface(title: string) {
    this.title = title;
    this.contentProjectedModal.openModal();
  }

  openEditModalInterface(title: string, recruiterModal: RecruiterModel) {
    this.title = title;
    this.recruiterForm.setValue({
      id:recruiterModal.id,
      name: recruiterModal.name,
    });
    this.contentProjectedModal.openModal();
  }

  onSubmit() {
    this.afterSubmit.emit();
    if(!this.isEdit){
      this.examBodyService.postData(this.recruiterForm.value).pipe(
        catchError((error: HttpErrorResponse) => { return this.handleError(error, 'Exam Recruiter details are Not Inserted due to SERVER ERROR OR DUPLICATE entry, kindly contact administrator if it is not a duplicate entry') })
      ).subscribe(data => {
        this.onResponseCallback.emit({ responseType: ResponseType.Success, message: 'Exam Recruiter Details Successfully Inserted!!' });
        this.onReset();
        this.modalService.dismissAll();
        console.log(data);
      })
    }
    else{
      this.examBodyService.updateData(this.recruiterForm.value).pipe(
        catchError((error: HttpErrorResponse) => { return this.handleError(error, 'Exam Recruiter details are Not Updated due to SERVER ERROR, kindly contact administrator.') })
      ).subscribe(data => {
        this.onResponseCallback.emit({ responseType: ResponseType.Success, message: 'Exam Recruiter Details Successfully Updated!!' });
        this.onReset();
        this.modalService.dismissAll();
        console.log(data);
      })
    }
  }

  onReset() {
    this.recruiterForm.setValue({
      id:'',
      name: ''
    });
    console.log(this.recruiterForm.value);
  }
  handleError(error: any, UiMessage: string) {
    this.onResponseCallback.emit({ responseType: ResponseType.Failure, message: UiMessage });
    console.log(error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-danger text-light', delay: 10000 });
  }
}
