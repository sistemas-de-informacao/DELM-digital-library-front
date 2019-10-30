import { FormGroup } from '@angular/forms';

export class User {

    id: number;
    nickname: string;
    nome: string;
    email: string;
    senha: string;
    saldo: number;
    dataCriacao: Date;
    ativo: boolean;

    constructor(id: number, nickname: string, nome: string, email: string, senha: string, saldo: number, dataCriacao: Date, ativo: boolean) {
        this.id = id;
        this.nickname = nickname;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.ativo = ativo;
    }

    deserialize(userFormGroup: FormGroup) {
        this.nickname = userFormGroup.get('nickname').value;
        this.nome = userFormGroup.get('nome').value;
        this.email = userFormGroup.get('email').value;
        this.ativo = userFormGroup.get('ativo').value;
    }

}