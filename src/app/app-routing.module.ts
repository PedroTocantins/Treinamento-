import { DashBoardComponent } from './dashBoard/dashBoard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProfessorComponent } from './professor/professor.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //Quando nenhum componente for chamado ele vai automaticamente redirecionar para o dashboard
  {path: 'alunos', component: AlunosComponent},//rota para ir até a lista de alunos
  {path: 'dashboard', component: DashBoardComponent},//rota para ira até a pagina principal
  {path: 'perfil', component: PerfilComponent},//rota para ir até a pagina do perfil
  {path: 'professores', component: ProfessorComponent},//Rota para ir até a lista de professores


  //path == caminho
  //component == componente que a rota deve encontrar
  //redirectTo == redireciona para onde nós queremos
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
