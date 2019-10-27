import { FormGroup } from '@angular/forms';

export class UserCadastreForm {

    displayName: string;
    name: string;
    user: string;
    password: string;

    constructor(loginFormGroup: FormGroup) {
        this.displayName = loginFormGroup.get('displayName').value;
        this.name = loginFormGroup.get('name').value;
        this.user = loginFormGroup.get('user').value;
        this.password = loginFormGroup.get('password').value;
    }

}
