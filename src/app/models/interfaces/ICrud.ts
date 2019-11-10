import { Observable } from 'rxjs';

export interface ICrud<T> {

    criar(object: T): Observable<any>;

    listar(): Observable<T[]>;

    editar(object: T): Observable<any>;

    deletar(id: number): Observable<any>;

    getPorId(id: number): Observable<any>;

}