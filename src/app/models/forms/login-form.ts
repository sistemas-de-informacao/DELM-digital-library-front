import { FormGroup } from '@angular/forms';

export class LoginForm {

    user: string;
    senha: string;

    constructor(loginFormGroup?: FormGroup, user?: string, senha?: string) {
        if (loginFormGroup) {
            this.user = loginFormGroup.get('user').value;
            this.senha = loginFormGroup.get('senha').value;
        } else {
            this.user = user;
            this.senha = senha;
        }
    }

}
