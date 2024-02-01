import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  backendWeb: string = 'http://localhost:8888';

  constructor(private httpClient:HttpClient) { }

  obtenerPersonas():Observable<any>{
    return this.httpClient.get(`${this.backendWeb}/personas/lista`,{});
  }

  crearPersonas(data: any): Observable<any> {
    return this.httpClient.post(`${this.backendWeb}/personas/lista`, {
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_de_nacimiento: data.fecha_de_nacimiento,
      tipo_documento: data.tipo_documento,
      numero_documento: data.numero_documento,
      estado: data.estado
    });
  }

  actualizarPersonas(data: any):Observable<any>{
    return this.httpClient.put(`${this.backendWeb}/personas/detalles/${data.idPer}`,{
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_de_nacimiento: data.fecha_de_nacimiento,
      tipo_documento: data.tipo_documento,
      numero_documento: data.numero_documento,
      estado: data.estado
    });
  }

  eliminarPersonas(data: any):Observable<any>{
    return this.httpClient.delete(`${this.backendWeb}/personas/detalles/${data.idPer}`,{});
  }
}
