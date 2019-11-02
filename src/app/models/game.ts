export class Game {

    id: number;
    nome: string;
    preco: number;
    dataLancamento: string;
    desenvolvedor: string;
    descricao: string;
    idCategoria: any;
    img: string;

    constructor(nome: string, preco: number, dataLacamento: string, desenvolvedor: string, descricao: string,
        idCategoria: any, img?: string, id?: number) {
        this.nome = nome;
        this.preco = preco;
        this.dataLancamento = dataLacamento;
        this.desenvolvedor = desenvolvedor;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
        this.id = id;
        this.img = img;
    }

}
