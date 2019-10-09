import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransacaoRoutingModule } from './app.transacao-routing.module';

import { PesquisaTransacaoComponent } from './pesquisa-transacao/pesquisa-transacao.component';
import { CadastroTransacaoComponent } from './cadastro-transacao/cadastro-transacao.component';

@NgModule({
  declarations: [
    PesquisaTransacaoComponent,
    CadastroTransacaoComponent,
  ],
  imports: [
    CommonModule,

    FontAwesomeModule,
    NgbDatepickerModule,

    TransacaoRoutingModule
  ]
})
export class TransacaoModule { }