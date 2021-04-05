import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import {ClienteInterface} from './cliente.interface';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  gerClientes(): Observable<ClienteInterface[]> {
    return of(CLIENTES);
  }
}
