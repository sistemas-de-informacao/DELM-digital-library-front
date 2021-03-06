import { FormGroup } from '@angular/forms';

export class GameCadastreForm {

    nome: string;
    preco: number;
    dataLancamento: Date;
    desenvolvedor: string;
    descricao: string;
    categoria: any;
    img: string;

    constructor(loginFormGroup: FormGroup, img?: string) {
        this.nome = loginFormGroup.get('nome').value;
        this.preco = loginFormGroup.get('preco').value;
        this.dataLancamento = loginFormGroup.get('dataLancamento').value;
        this.desenvolvedor = loginFormGroup.get('desenvolvedor').value;
        this.descricao = loginFormGroup.get('descricao').value;
        this.categoria = loginFormGroup.get('categoria').value;
        this.img = img;
    }

}
