import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { ResponseType } from "src/assets/libs/constants/text-constants";
import { ToastResponse } from "src/assets/libs/models/response-callback.model";

@Injectable()
export abstract class BaseService {
  toastSubject: Subject<ToastResponse>= new Subject();
  constructor(private http: HttpClient
    , private postEndPoint: string
    , private updateEndPoint: string
    , private readEndPoint: string
    , private deleteEndPoint: string
    , private apiUrl: string
    , private readApiUrl: string
    , private searchExamApiEndPoint: string) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  postData(data: any): Observable<any> {
    const url = `${this.apiUrl}` + this.postEndPoint;

    const options = { headers: this.getHeaders() };

    return this.http.post(url, data, options);
  }

  getDataWithFilter(filterData: any): Observable<any> {
    const url = `${this.readApiUrl}` + this.searchExamApiEndPoint;

    const options = { headers: this.getHeaders() };

    return this.http.post(url, filterData, options);
  }

  updateData(data: any): Observable<any> {
    const url = `${this.apiUrl}` + this.updateEndPoint;

    const options = { headers: this.getHeaders() };

    return this.http.put(url, data, options);
  }

  getData(): Observable<any> {
    const url = `${this.readApiUrl}` + this.readEndPoint;
    const options = { headers: this.getHeaders() };
    return this.http.get(url, options);
  }

  deleteData(data: any): Observable<any> {
    const url = `${this.apiUrl}` + this.deleteEndPoint;
    const options = {body:data, headers: this.getHeaders() };
    return this.http.delete(url, options);
  }

  handleError(error: any, UiMessage: string) {
    this.toastSubject.next({ responseType: ResponseType.Failure, message: UiMessage });
    console.log(error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  handleSuccess(UiMessage: string) {
    this.toastSubject.next({ responseType: ResponseType.Success, message: UiMessage });
  }

}
