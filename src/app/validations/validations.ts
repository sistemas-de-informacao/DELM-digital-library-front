import { FormGroup } from '@angular/forms';

export class Validacoes {
    static senhasCombinam(formGroup: FormGroup) {
        if (formGroup.touched) {
            if (formGroup.root.get('senhaNova').value && formGroup.root.get('senhaNovaConfirmar').value) {
                if (formGroup.root.get('senhaNova').value === formGroup.root.get('senhaNovaConfirmar').value) {
                    return null;
                } else {
                    return { senhasNaoCombinam: true };
                }
            }
        }
    }
}
