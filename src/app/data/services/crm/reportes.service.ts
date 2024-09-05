import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte } from '../../models/Reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;



  getByClientId( id : string) : Observable<Reporte[]> {
    let params = new HttpParams();
    params = params.append('id', id);


    const apiToReport = this.apiUrl+'/reporteVentas';
    return this.http.get<Reporte[]>(apiToReport, {params});


  }






  constructor() { }

}
