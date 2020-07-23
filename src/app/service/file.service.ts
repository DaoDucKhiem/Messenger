import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileModel } from '../model/file';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: FormData):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-STRINGEE-AUTH': JSON.parse(localStorage.getItem('user')).token,
      })
    };
    return this.http.post(`https://api.stringee.com/v1/file/upload?uploadType=multipart`, file, httpOptions);
  }

  //upload file info to server
  uploadFileServer(file: object) {
    return this.http.post<object>(`${environment.apiFile}`, file);
  }

  //lấy một vài file
  getSomeFile(convId: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${environment.apiFile}/${'getFiles?convId='+convId}`);
  }

  //lấy tất cả các file
  getAllFile(convId: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${environment.apiFile}/${'getAllFile?convId='+convId}`);
  }

  //lấy một vài ảnh
  getSomeImage(convId: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${environment.apiFile}/${'getImages?convId='+convId}`);
  }

  //lấy tất cả các ảnh
  getAllImage(convId: string): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${environment.apiFile}/${'getAllImage?convId='+convId}`);
  }
}
