import { DateService } from 'src/app/services/date.service';
import { User } from 'src/app/models/user';
import { Game } from 'src/app/models/game';

export class Cart {

    jogos: Game[];
    dataCompra: string;
    totalCompra: number;
    comprador: User;

    constructor(jogos: Game[], totalCompra: number, comprador: User) {
        this.jogos = jogos;
        this.dataCompra = DateService.getDataAgora();
        this.totalCompra = totalCompra;
        this.comprador = comprador;
    }

}