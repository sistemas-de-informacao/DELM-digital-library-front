import { FormGroup } from '@angular/forms';

export class UserCadastreForm {

    nickname: string;
    nome: string;
    email: string;
    senha: string;

    constructor(loginFormGroup: FormGroup) {
        this.nickname = loginFormGroup.get('nickname').value;
        this.nome = loginFormGroup.get('nome').value;
        this.email = loginFormGroup.get('email').value;
        this.senha = loginFormGroup.get('senha').value;
    }

}
