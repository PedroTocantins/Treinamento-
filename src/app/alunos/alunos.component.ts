import { AlunoService } from './aluno.service';
import { Aluno } from './../models/Aluno';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private alunoService: AlunoService) {
    this.createForm();
  }

  public modalRef!: BsModalRef;
  public alunoForm!:FormGroup;
  public title: string = 'Alunos';
  public alunoSelected!:Aluno;

  public alunos!: Aluno[];


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  createForm(){
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    })
  }

  salvarAluno(aluno: Aluno){
    this.alunoService[aluno.id !== 0 ? 'put' : 'post'](aluno).subscribe(
      (model: any) => {
        console.log(model)
        this.carregarAlunos();
      },
      (erro: any) => {
        console.log(erro)
      }
    );
  }

  alunoSubmit(){
    this.salvarAluno(this.alunoForm.value)

  }

  alunoSelect(aluno:Aluno){
    this.alunoSelected = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo(){
    this.alunoSelected = new Aluno;
    this.alunoForm.patchValue(this.alunoSelected);
  }

  voltar(){
    this.alunoSelected = null!;
  }
  deletarAluno(id: number){
    this.alunoService.delete(id).subscribe(
      (model : any) => {
        console.log(model)
        this.carregarAlunos()
      },
      (erro : any) => {
        console.error(erro)
      }
    )
  }


}
