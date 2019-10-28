import { FormGroup } from '@angular/forms';

export class UserCadastreForm {

    nickname: string;
    nome: string;
    user: string;
    senha: string;

    constructor(loginFormGroup: FormGroup) {
        this.nickname = loginFormGroup.get('nickname').value;
        this.nome = loginFormGroup.get('nome').value;
        this.user = loginFormGroup.get('user').value;
        this.senha = loginFormGroup.get('senha').value;
    }

}
