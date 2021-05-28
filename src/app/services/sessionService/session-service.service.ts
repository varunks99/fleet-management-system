import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.url + '/manager/login', data)
      .pipe(map((result: any) => {
        if (result.Validated) {
          window.sessionStorage.setItem('username', data.username)
        }
        return result;
      }))
  }

  register(data: any) {
    window.sessionStorage.removeItem('username');
    return this.http.post(this.url + '/manager/login', data)
      .pipe(map((result: any) => {
        return result;
      }))
  }

}
