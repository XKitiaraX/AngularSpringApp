import { Injectable } from '@angular/core';
// import {CLIENTES} from './clientes.json';
import {ClienteInterface} from './cliente.interface';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ClienteInterface[]> {
    // return of(CLIENTES);
    return this.http.get<ClienteInterface[]>(this.urlEndPoint);
  }

  create(cliente: ClienteInterface): Observable<ClienteInterface> {
    return this.http.post<ClienteInterface>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
  }

  getCliente(id: number): Observable<ClienteInterface> {
    return this.http.get<ClienteInterface>(`${this.urlEndPoint}/${id}`);
  }

  update(cliente: ClienteInterface): Observable<ClienteInterface> {
    return this.http.put<ClienteInterface>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  public delete(id: number): Observable<ClienteInterface> {
    return this.http.delete<ClienteInterface>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
