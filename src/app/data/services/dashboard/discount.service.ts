import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Discount } from '../../models/Discount.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  apiMobile = environment.apiMobile+'/discounts';
  private http = inject(HttpClient);

  constructor() { }

  getDiscounts() : Observable<Discount[]>{
    return this.http.get<Discount[]>(this.apiMobile);
  }

  getDiscount( id : number | string) : Observable<Discount[]>  {
    return this.http.get<Discount[]>(`${this.apiMobile}?id=${id}`);
  }


}
