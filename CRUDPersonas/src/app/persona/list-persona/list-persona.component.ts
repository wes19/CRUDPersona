import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetodosService } from '../metodos.service';
import { PersonaService } from '../../services/persona.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.scss']
})
export class ListPersonaComponent implements OnInit {
  btnActivo: string = 'kamba';
  personas:any=[];
  personaNuevo:any=[];

  registroPersona = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos : new FormControl('', Validators.required),
    fecha_de_nacimiento: new FormControl('', Validators.required),
    tipo_documento: new FormControl('', Validators.required),
    numero_documento: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private personaService: PersonaService, private metodosService: MetodosService, private modalService: NgbModal) {}

  ngOnInit(): void {
   this.cargarPersonas();
  }

  get obt(){
    return this.registroPersona.controls;
  }

  cargarPersonas(){
    this.personaService.obtenerPersonas().subscribe(
      {
        next: res=> {
          this.personas = res;
        },
        error: err =>{
          console.log(err);
        }
      }
    )
  }

  guardarPersona(){
    const jsonPersona = {
      nombres: this.registroPersona.controls['nombres'].value,
      apellidos: this.registroPersona.controls['apellidos'].value,
      fecha_de_nacimiento: this.registroPersona.controls['fecha_de_nacimiento'].value,
      tipo_documento: this.registroPersona.controls['tipo_documento'].value,
      numero_documento: this.registroPersona.controls['numero_documento'].value,
      estado: this.registroPersona.controls['estado'].value
    }
    this.personaService.crearPersonas(jsonPersona).subscribe(
      {
        next: res=>{
          console.log(res);
          this.registroPersona.reset();
          this.guardadoExitosamente();
        },
        error: err =>{
          console.log(err);
        }
      }
    );
  }

  detailEmpleadosNavigate(persona: any) {
    const personaSeleccionada = persona;
    this.metodosService.setPersonaSeleccionada(personaSeleccionada);
    this.router.navigate(['/personas/detalles'])
  }

  guardadoExitosamente(){
    Swal.fire({
      title: 'Guardado Exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 4000, 
    });
  }
}
