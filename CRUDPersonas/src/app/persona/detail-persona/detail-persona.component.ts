import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosService } from '../metodos.service';
import { PersonaService } from '../../services/persona.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-persona',
  templateUrl: './detail-persona.component.html',
  styleUrls: ['./detail-persona.component.scss'],
  providers: [DatePipe]
})
export class DetailPersonaComponent implements OnInit {
  personaModal:any=[];
  persona:any=[];

  constructor(private router: Router, private personaService: PersonaService, private metodosService: MetodosService, private modalService: NgbModal,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.metodosService.getPersonaSeleccionada().subscribe((persona) => {
      this.persona = persona;
      const fecha_nacimiento = this.datePipe.transform(this.persona.fecha_de_nacimiento, 'yyyy-MM-dd');
      this.persona = {
        ...this.persona, fecha_nacimiento
      };
    });
  }

  modalEditar(modal: any, persona: any): void {
    this.modalService.open(modal, {
      size: 'lg',
      centered: true,
    });
    this.personaModal = persona;
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
              console.log(res)
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

  actualizarPersona(persona: any)   {
    this.personaService.actualizarPersonas(persona).subscribe(
      {
        next: res=>{
          console.log(res)
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


    /*const jsonActualizar = {
      idPer : this.personaModal.idEsp,
      nombres : this.personaModal.nombre,
      apellidos : this.personaModal.imagen,
      fecha_de_nacimiento : this.personaModal.fecha_de_nacimiento,
      tipo_documento : this.personaModal.tipo_documento,
      numero_documento : this.personaModal.numero_documento,
      estado : this.personaModal.estado
    }*/
