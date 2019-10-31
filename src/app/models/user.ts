import { FormGroup } from '@angular/forms';

export class User {

    id: number;
    nickname: string;
    nome: string;
    email: string;
    senha: string;
    saldo: number;
    dataCriacao: string;
    ativo: boolean;

    constructor(id: number = null, nickname: string = null, nome: string = null, email: string = null, senha: string = null, saldo: number = 1000.0, dataCriacao: string = null, ativo: boolean = null) {
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