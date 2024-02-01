import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodosService {
  private personaSeleccionada: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private localStorageKey: string = '';

  constructor() {
    const storedPersona = localStorage.getItem(this.localStorageKey);
    if (storedPersona) {
      this.personaSeleccionada.next(JSON.parse(storedPersona));
    }
  }

  setPersonaSeleccionada(persona: any) {
    this.personaSeleccionada.next(persona);
    localStorage.setItem(this.localStorageKey, JSON.stringify(persona));
  }

  getPersonaSeleccionada(): Observable<any> {
    return this.personaSeleccionada.asObservable();
  }
}
