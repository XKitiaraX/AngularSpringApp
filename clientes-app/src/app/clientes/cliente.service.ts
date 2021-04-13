import { Injectable } from '@angular/core';
// import {CLIENTES} from './clientes.json';
import {ClienteInterface, PaginaClientes, RespuestaInterface} from './cliente.interface';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router) { }

  getClientes(): Observable<ClienteInterface[]> {
    // return of(CLIENTES);
    return this.http.get<ClienteInterface[]>(this.urlEndPoint);
  }

  getClientesPaginados(page: number): Observable<PaginaClientes> {
    return this.http.get(this.urlEndPoint + `/page/${page}`).pipe(
      // tap((res: PaginaClientes) => {
      //  (res.content as ClienteInterface[]).forEach(cliente => {
      //    console.log(cliente.nombre);
      //  });
      // }),
      map(res => {
        return res as PaginaClientes;
      })
    )
  }

  create(cliente: ClienteInterface): Observable<RespuestaInterface> {
    return this.http.post<RespuestaInterface>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        if (err.status==400) {
          return throwError(err);
        }

        console.error(err.error.mensaje);
        swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      })
    )
  }

  getCliente(id: number): Observable<RespuestaInterface> {
    return this.http.get<RespuestaInterface>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: ClienteInterface): Observable<RespuestaInterface> {
    return this.http.put<RespuestaInterface>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        if (err.status==400) {
          return throwError(err);
        }
        console.error(err.error.mensaje);
        swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      }));
  }

  public delete(id: number): Observable<RespuestaInterface> {
    return this.http.delete<RespuestaInterface>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        console.error(err.error.mensaje);
        swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      }));
  }
}
