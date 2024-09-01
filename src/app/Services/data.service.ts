import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataModel } from '../Models/DataModel';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  createData(obj: DataModel): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(environment.LOCAL_API_URL+"api/Main/CreateData", obj);
  }

  getAllData():Observable<DataModel[]>{
    return this.http.get<DataModel[]>(environment.LOCAL_API_URL+"api/Main/GetAll");
  }

  getData():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(environment.LOCAL_API_URL+"api/Main/GetAll");
  }

  getDataBySerialNumber(serialNumber:number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(environment.LOCAL_API_URL+"api/Main/GetBySerialNumber?serialNumber="+serialNumber);
  }

  deleteData(serialNumber: number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(environment.LOCAL_API_URL+"api/Main/DeleteData?serialNumber="+serialNumber);
  }

  //Extra if needed
  updateData(serialNumber:number, obj:DataModel): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(environment.LOCAL_API_URL+"api/Main/UpdateData?serialNumber="+serialNumber, obj);
  }
  
  // login service
  login(email:string, password:string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.LOCAL_API_URL+`api/Main/Login?emailId=${email}&password=${password}`);
  }

  //Upload Zip File Link
  uploadFiles(files: File[], uploadLink: string):Observable<ApiResponse>{
    const formData: FormData = new FormData();
    
    for (let file of files) {
      formData.append('files', file, file.name);
    }
    formData.append('uploadLink', uploadLink);
    return this.http.post<ApiResponse>(environment.LOCAL_API_URL+"api/Main/UploadFiles?uploadLink="+uploadLink, formData);
  }
}
