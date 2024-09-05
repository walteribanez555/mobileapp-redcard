import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coverage } from '../../models/Coverage.model';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {

  apiMobile = environment.apiMobile+'/coverages';
  private http = inject(HttpClient);

  constructor() { }


  getCoverages() : Observable<Coverage[]>{
    return this.http.get<Coverage[]>(this.apiMobile);
  }

  getCoverage( id : number | string) : Observable<Coverage[]>  {
    return this.http.get<Coverage[]>(`${this.apiMobile}?id=${id}`);
  }



}
