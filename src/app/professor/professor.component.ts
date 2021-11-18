import { ProfessorService } from './professor.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component,Input,OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/Professor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  constructor(private fb: FormBuilder, private modalService: BsModalService, private professorService: ProfessorService) {
    this.createForm();
  }

  modalRef?: BsModalRef;
  public professorForm!: FormGroup;
  title = "Professores";
  public profSelected!:Professor;

  public professores!: Professor[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public profSelect(prof : Professor){
    this.profSelected = prof;
    this.professorForm.patchValue(prof);
  }

  createForm(){
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      //disciplina: ['', Validators.required]
    })
  }

  salvarProfessor(professor: Professor){
    this.professorService[professor.id !== 0 ? 'put' : 'post']( professor).subscribe(
      (model: any) => {
        console.log(model)
        this.carregarProfessores();
      },
      (erro: any) => {
        console.log(erro)
      }
    );
  }

  professorSubmit(){
    this.salvarProfessor(this.professorForm.value)

  }

  professorNovo(){
    this.profSelected = new Professor;
    this.professorForm.patchValue(this.profSelected);
  }

  voltar(){
    this.profSelected = null!;
  }

  ngOnInit() {
    this.carregarProfessores();
  }

  carregarProfessores(){
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro : any) =>{
        console.log(erro)
      }
    )
  }
}
