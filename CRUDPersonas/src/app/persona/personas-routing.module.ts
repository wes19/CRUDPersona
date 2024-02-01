import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPersonaComponent } from './detail-persona/detail-persona.component';
import { ListPersonaComponent } from './list-persona/list-persona.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'detalles', component: DetailPersonaComponent }
    ]
  },
  {
    path: '',
    children: [
      { path: 'lista', component: ListPersonaComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})

export class PersonaRoutingModule { }
