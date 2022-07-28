import { Peticion } from './../models/peticion';
import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../unidad.service';
import { Unidad } from '../models/unidad';
@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {
  unidades: Unidad[]
  mensajeError?: String
  nombre?: string
  
  constructor(private unidadService : UnidadService) { }

  ngOnInit(): void {
    this.getUnidades();
  }
  getUnidades(): void{
    this.unidadService.getUnidades()
    .subscribe({next: (v) => {
        this.unidades = v
      },
      error: (e) =>{
        this.mensajeError = e.message;  
      }
    }
      )
  }
  addUnidad(){
    var peticion = new Peticion()
    peticion.campoNombre = this.nombre
this.unidadService.addUnidad(peticion)
.subscribe({next: (v) => {
  this.mensajeError = v.mensaje
  this.getUnidades()
},
error: (e) =>{
  this.mensajeError = e.message;  
}
}
)
  }
}
