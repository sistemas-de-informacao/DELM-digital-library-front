import { FormGroup } from '@angular/forms';

export class AdminCadastreForm {

    id: number;
    nickname: string;
    nome: string;
    email: string;
    saldo: number;
    dataCriacao: Date;

    constructor(adminFormGroup: FormGroup, id?: number) {
        this.nickname = adminFormGroup.get('nickname').value;
        this.nome = adminFormGroup.get('nome').value;
        this.email = adminFormGroup.get('email').value;
        this.saldo = adminFormGroup.get('saldo').value;
        this.dataCriacao = new Date();
        this.id = id;
    }

}
