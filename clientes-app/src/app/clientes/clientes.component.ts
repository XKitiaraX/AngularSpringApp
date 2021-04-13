import { Component, OnInit } from '@angular/core';
import {ClienteInterface} from './cliente.interface';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2'

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
    // this.cargarClientes();
    this.cargarClientesPaginados();
  }

  delete(cliente: ClienteInterface): void {

    swal.fire({
      title: '¿Seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(response => {
          // this.clientes.filter(cli => cli !== cliente)
          swal.fire(
            'Cliente eliminado',
            `Cliente ${cliente.nombre} eliminado`,
            'success'
          );
          // this.cargarClientes();
          this.cargarClientesPaginados();
        })
      }
    })
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  cargarClientesPaginados(): void {
    let page: number = 0;
    this.clienteService.getClientesPaginados(page).subscribe(
      res => {
        this.clientes = res.content as ClienteInterface[];
      }
    );
  }
}
