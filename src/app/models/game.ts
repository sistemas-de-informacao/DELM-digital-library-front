export class Game {

    id: number;
    nome: string;
    preco: number;
    dataLancamento: Date;
    desenvolvedor: string;
    descricao: string;
    categoria: any;
    img: string;

    constructor(nome: string, preco: number, dataLacamento: Date, desenvolvedor: string, descricao: string,
        categoria: any, img?: string, id?: number) {
        this.nome = nome;
        this.preco = preco;
        this.dataLancamento = dataLacamento;
        this.desenvolvedor = desenvolvedor;
        this.descricao = descricao;
        this.categoria = categoria;
        this.id = id;
        this.img = img;
    }

}
