import { FormGroup } from '@angular/forms';

export class User {

    id: number;
    nickname: string;
    nome: string;
    email: string;
    senha: string;
    saldo: number;
    dataCriacao: Date;

    constructor(id: number, nickname: string, nome: string, email: string, senha: string, saldo: number, dataCriacao: Date) {
        this.id = id;
        this.nickname = nickname;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
    }

    deserialize(userFormGroup: FormGroup) {
        this.nickname = userFormGroup.get('nickname').value;
        this.nome = userFormGroup.get('nome').value;
        this.email = userFormGroup.get('email').value;
    }

}