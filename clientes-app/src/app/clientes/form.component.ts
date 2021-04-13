import { Component, OnInit } from '@angular/core';
import {ClienteInterface} from './cliente.interface';
import {ClienteService} from './cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  titulo: string = "Crear cliente"
  cliente: ClienteInterface = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    createAt: ''
  }

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      res => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${res.nombre} creado con éxito`, 'success')
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe( cliente => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} creado con éxito`, 'success')
    })
  }


}
