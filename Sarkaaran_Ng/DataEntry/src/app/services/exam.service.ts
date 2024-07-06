import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment.development";
import { BaseService } from './shared/base.service';
import { ExamModel } from '../manage-exams/models/exam.model';
import { Utilities } from './utility.service';

@Injectable()
export class ExamService extends BaseService {
  constructor(
    http: HttpClient,
    private utilityService:Utilities
  ) {
    super(http
    ,environment.createapiEndPoint
    ,environment.editApiEndPoint
    ,environment.readApiEndPoint
    ,environment.deleteApiEndPoint
    ,environment.baseapiUrl
    ,environment.baseReadApiUrl
    ,environment.searchExamApiEndPoint);
  }

  setExamObjectToSubmit(examModel:ExamModel,isDelete:boolean){
    let examCategory='Central';
    let isGenderBased=false;
    if(examModel.examState!=='' && examModel.examState!==null){
      examCategory='State';
    }
    if(examModel.gender!=='' && examModel.gender!==null){
      isGenderBased=true;
    }

    return {
      id:examModel.id,
      name: examModel.name,
      examBodyId:examModel.examBody.id,
      examBody:examModel.examBody,
      examDate: !isDelete?this.utilityService.toNgbDate(examModel.examDate):this.twoStepDateFormat(examModel.examDate),
      notificationDate: !isDelete?this.utilityService.toNgbDate(examModel.notificationDate):this.twoStepDateFormat(examModel.notificationDate),
      applicationLastDate: !isDelete?this.utilityService.toNgbDate(examModel.applicationLastDate):this.twoStepDateFormat(examModel.applicationLastDate),
      //retrieve time from application last date value and assign below
      applicationLastTime:{hour: 23, minute: 59, second:0},
      examDuration: examModel.examDuration,
      examNotificationLink: examModel.examNotificationLink,
      examApplicationLink: examModel.examApplicationLink,
      examAgeLimit: examModel.examAgeLimit,
      examEduEligibility: examModel.examEduEligibility,
      examVacancy: examModel.examVacancy,
      examMoreDetails: examModel.examMoreDetails,
      examCategory: examCategory,
      examState: examModel.examState,
      isPhysicalTest: examModel.isPhysicalTest,
      isGenderBased: isGenderBased,
      gender:examModel.gender,
      newExamConductingBody:'',
    }
  }

  private twoStepDateFormat(date:any):any{
    let ngbDate=this.utilityService.toNgbDate(date);
    return this.utilityService.formatDateFromDatePickerObject(ngbDate,"");
  }

}
