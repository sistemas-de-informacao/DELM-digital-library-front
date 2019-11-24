export class UpdatePasswordForm {

    senhaAntiga: string;
    senhaNova: string;
    senhaNovaConfirmar: string;

    constructor(senhaAntiga: string, senhaNova: string, senhaNovaConfirmar: string) {
        this.senhaAntiga = senhaAntiga;
        this.senhaNova = senhaNova;
        this.senhaNovaConfirmar = senhaNovaConfirmar;
    }

}
