import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Venta, VentaToPost, VentaResp } from '../../models/Venta.model';

@Injectable({
  providedIn: 'root',
})
export class VentasService {

  private apiUrl  = environment.apiUrl + '/ventas';

  private http = inject(HttpClient);


  constructor() {}
  getAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Venta[]> {

    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Venta[]>(this.apiUrl, { params }).pipe(
      map((resp: Venta[]) => {
        if (resp.length === 0) {
          throw new Error("Venta Not Found");
        }
        return [resp[0]];
      })
    );
  }
  create(item: VentaToPost): Observable<VentaResp> {
    return this.http.post<VentaResp>(this.apiUrl, item);
  }



  update(id: string | number, item: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.put<any>(this.apiUrl,item , {params})

  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }


  createIntentPaymentStripe( price : number , details :string) {


    const api = "https://02mlhdeei4.execute-api.us-east-1.amazonaws.com/dev_v1/payments";

    return this.http.post(api , {price, details});



  }



}
