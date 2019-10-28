import { FormGroup } from '@angular/forms';

export class LoginForm {

    user: string;
    senha: string;

    constructor(loginFormGroup: FormGroup) {
        this.user = loginFormGroup.get('user').value;
        this.senha = loginFormGroup.get('senha').value;
    }

}
