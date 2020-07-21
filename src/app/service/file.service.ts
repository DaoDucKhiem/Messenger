import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  messageFile: [];

  constructor(private http: HttpClient) { }

  uploadFile(file: FormData):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-STRINGEE-AUTH': JSON.parse(localStorage.getItem('user')).token,
      })
    };
    return this.http.post(`https://api.stringee.com/v1/file/upload?uploadType=multipart`, file, httpOptions);
  }
}
