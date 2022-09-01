import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  constructor(public http: HttpClient) {}
  get_image(): Observable<any> {
    let url = 'http://localhost:3200/images';
    let param = {
      key: 'file_src, imagetime, imagetag, imagename',
    };
    return this.http.get(url, { params: param });
  }
  
}
