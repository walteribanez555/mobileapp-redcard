import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, map, tap, of } from 'rxjs';
import { IntentLogin, ResponseLogin } from '../../models/IntentLogin';
import { environment } from 'src/environments/environment';
import { ClientesService } from '../crm/clientes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private http = inject(HttpClient);

  private apiUrl = environment.apiAuthUrl + '/sessions';
  private clienteService  = inject(ClientesService);




  login(intentLogin: IntentLogin): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.apiUrl, intentLogin).pipe(
      switchMap(resp => {
        const [client_id, ...office_id] = intentLogin.username.split('_');
        localStorage.setItem('username', client_id);
        localStorage.setItem('office_id', office_id.join());
        localStorage.setItem('Authorization', resp.sessionToken);

        // Call the getClientId function here using switchMap
        return this.getClientId(client_id).pipe(
          switchMap(() => {
            return of(resp); // Return the original response from the login POST request
          })
        );
      })
    );
  }


  getClientId(client_id: string): Observable<any> {
    return this.clienteService.getOne(client_id).pipe(
      map(resp => {
        if (!resp || resp.length === 0) {
          throw new Error("No se encontró");
        }
        localStorage.setItem('client_id', resp[0].cliente_id!.toString());
        return resp; // Returning the response from the HTTP request
      })
    );
  }


  getUser() {
    return localStorage.getItem('client_id');
  }

  logout() {
    localStorage.removeItem('client_id');
    localStorage.removeItem('Authorization');
    localStorage.setItem('Authorization', 'ExternalUser902010');
  }


}
