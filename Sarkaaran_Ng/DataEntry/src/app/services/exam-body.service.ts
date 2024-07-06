import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { BaseService } from "./shared/base.service";

@Injectable()
export class ExamBodyService extends BaseService {
  constructor(http: HttpClient) {
    super(http
    ,environment.createBodyApiEndPoint
    ,environment.editBodyApiEndPoint
    ,environment.getBodyApiEndPoint
    ,environment.deleteBodyApiEndPoint
    ,environment.baseapiUrl
    ,environment.baseReadApiUrl
    , environment.searchExamApiEndPoint);
  }

}
