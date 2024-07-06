import { RecruiterModel } from "src/assets/libs/models/recruiter.model";

export interface ExamModel{
  rowKey:string,
  id:number,
  name:string,
  applicationLastDate:string,
  examDate:string,
  examBody:RecruiterModel,
  examBodyId:number,
  examNotificationLink:string,
  notificationDate:string,
  examApplicationLink:string,
  examDuration:number,
  examMoreDetails:string,
  examAgeLimit:string,
  examEduEligibility:string,
  examVacancy:number,
  examState: string,
  isPhysicalTest:boolean,
  gender:string
}
