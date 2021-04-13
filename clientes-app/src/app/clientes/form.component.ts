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

  errores!: string[];

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
        this.clienteService.getCliente(id).subscribe(res => {
          this.cliente = res.cliente;
        })
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      res => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `${res.mensaje}: ${res.cliente.nombre}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Status: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe( res => {
      this.router.navigate(['/clientes']);
      swal.fire('res.mensaje', `${res.mensaje}: ${res.cliente.nombre}`, 'success')
    },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Status: ' + err.status);
        console.error(err.error.errors);
    });
  }


}
