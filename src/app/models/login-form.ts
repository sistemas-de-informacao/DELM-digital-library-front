import { FormGroup } from '@angular/forms';

export class LoginForm {

    private user: string;
    private password: string;

    constructor(loginFormGroup: FormGroup) {
        this.user = loginFormGroup.get('user').value;
        this.password = loginFormGroup.get('password').value;
    }

}
