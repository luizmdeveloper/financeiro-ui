import { Component, OnInit } from '@angular/core';

import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'src/app/core/model';
import { Contafiltro } from './../modelo.filtro';
import { ErroHandlerService } from './../../core/erro-handler.service';
import { ContaService } from './../conta.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-pesquisa-conta',
  templateUrl: './pesquisa-conta.component.html',
  styleUrls: ['./pesquisa-conta.component.css']
})
export class PesquisaContaComponent implements OnInit {

  alert: Alert;
  filtro = new Contafiltro();
  contas = [];
  totalElementos: number;

  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;

  constructor(private contaService: ContaService,
              private erroHandlerService: ErroHandlerService,
              private auth: AuthService) { }

  ngOnInit() {
    this.alert = new Alert();

    this.pesquisar();
  }

  pesquisar(){
    this.contaService.filtrar(this.filtro)
      .then(resultado => {
        this.contas = resultado.contas;
        this.totalElementos = resultado.totalRegistro;
      })
      .catch(erro => {
        this.showAlert(true, 'danger', this.erroHandlerService.handle(erro));
      })
  }

  loadPage() {
    this.filtro.paginaAtual = this.filtro.paginaAtual - 1;
    this.pesquisar();
    this.filtro.paginaAtual = this.filtro.paginaAtual + 1;
  }

  showAlert(mostra: boolean, type: string, mensagem: string) {
    this.alert.mostrar = mostra;
    this.alert.type = type;
    this.alert.mensagem = mensagem;
  }

  closeAlert() {
    this.showAlert(false, '', '');
  }

  excluir(conta) {
    this.contaService.excluir(conta.codigo)
          .then(() => {
            this.showAlert(true, 'success', 'Conta excluída com sucesso!');
            this.loadPage();
          })
          .catch(erro => {
            this.showAlert(true, 'danger', this.erroHandlerService.handle(erro));
          });
  }

}
