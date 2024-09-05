import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Beneficiario, BeneficiarioToPost } from '../../models/Beneficiario.model';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService  {


  private apiUrl = environment.apiUrl +'/beneficiarios';


  private http = inject(HttpClient);


  constructor() {}
  getAll(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Beneficiario[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Beneficiario[]>(this.apiUrl, { params }).pipe(
      map((resp: Beneficiario[]) => {
        if (resp.length === 0) {
          throw new Error("Beneficiario no encontrado");
        }
        return resp;
      })
    );
  }
  create(item: BeneficiarioToPost): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(this.apiUrl, item);
  }
  update(id: string | number, item: Beneficiario): Observable<Beneficiario> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
