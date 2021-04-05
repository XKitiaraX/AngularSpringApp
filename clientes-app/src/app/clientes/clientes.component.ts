import { Component, OnInit } from '@angular/core';
import {ClienteInterface} from './cliente.interface';
import {ClienteService} from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes: ClienteInterface[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.gerClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

}
