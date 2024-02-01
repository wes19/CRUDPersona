import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.scss'],
  providers: [DatePipe]
})
export class ListPersonaComponent implements OnInit {
  btnActivo: string = 'kamba';
  personas:any=[];
  personaNuevo:any=[];
  personaModal:any=[];
  personaGuardar:any=[];

  registroPersona = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos : new FormControl('', Validators.required),
    fecha_de_nacimiento: new FormControl('', Validators.required),
    tipo_documento: new FormControl('', Validators.required),
    numero_documento: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private personaService: PersonaService, private modalService: NgbModal, private datePipe: DatePipe) {}

  ngOnInit(): void {
   this.cargarPersonas();
  }

  get obt(){
    return this.registroPersona.controls;
  }

  cargarPersonas(){
    this.personaService.obtenerPersonas().subscribe(
      {
        next: res => {
          this.personas = res.map((persona: any) => {
            const fecha_de_nacimiento = this.datePipe.transform(persona.fecha_de_nacimiento, 'yyyy-MM-dd');
            return { ...persona, fecha_de_nacimiento };
          });
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  guardarPersona(){
    const jsonGuardar = {
      idPer : this.personaGuardar.idEsp,
      nombres : this.personaGuardar.nombres,
      apellidos : this.personaGuardar.apellidos,
      fecha_de_nacimiento : this.personaGuardar.fecha_de_nacimiento,
      tipo_documento : this.personaGuardar.tipo_documento,
      numero_documento : this.personaGuardar.numero_documento,
      estado : this.personaGuardar.estado
    }
    this.personaService.crearPersonas(jsonGuardar).subscribe(
      {
        next: res=>{
          console.log(res);
          this.modalService.dismissAll();
          this.cargarPersonas();
          this.guardadoExitosamente();
        },
        error: err =>{
          console.log(err);
        }
      }
    );
  }

  guardadoExitosamente(){
    Swal.fire({
      title: 'Guardado Exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 4000, 
    });
  }

  modalEditar(modal: any, persona: any): void {
    this.modalService.open(modal, {
      size: 'lg',
      centered: true,
    });
    this.personaModal = persona;
  }

  modalCrear(modal: any): void {
    this.modalService.open(modal, {
      size: 'lg',
      centered: true,
    });
  
  }

  modalDelete(persona: any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3e81e3',
      cancelButtonColor: '#D72E2E',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersonas(persona).subscribe(
          {
            next: res=>{
              console.log(res);
              this.cargarPersonas();
            },
            error: err =>{
              console.log(err);
            }
          }
        )
        Swal.fire({
          title: 'Eliminado',
          text: 'El registro ha sido eliminado',
          icon: 'success',
          customClass: {confirmButton: 'kz-button-blue'},
        });
      }
    });
  }

  actualizarPersona()   {
    const jsonActualizar = {
      idPer : this.personaModal.idPer,
      nombres : this.personaModal.nombres,
      apellidos : this.personaModal.apellidos,
      fecha_de_nacimiento : this.personaModal.fecha_de_nacimiento,
      tipo_documento : this.personaModal.tipo_documento,
      numero_documento : this.personaModal.numero_documento,
      estado : this.personaModal.estado
    }
    this.personaService.actualizarPersonas(jsonActualizar).subscribe(
      {
        next: res=>{
          console.log(res)
          this.cargarPersonas();
          this.editadoExitosamente();
        },
        error: err =>{
          console.log(err);
        }
      }
    );
  }

  editadoExitosamente(){
    Swal.fire({
      title: 'Editado Exitosamente!',
      icon: 'success',
      showConfirmButton: false,
      timer: 4000, 
    });
  }

}
