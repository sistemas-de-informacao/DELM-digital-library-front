import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { ICrud } from './../models/interfaces/ICrud';
import { Category } from './../models/category';
import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService implements ICrud<Category> {

  constructor(private http: HttpClient) { }

  criar(category: Category): Observable<any> {
    return this.http.post(`${environment.base_path}${Paths.CATEGORIES}`, category);
  }

  listar(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.base_path}${Paths.CATEGORIES}`);
  }

  editar(category: Category): Observable<any> {
    return this.http.put(`${environment.base_path}${Paths.CATEGORIES}`, category);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${environment.base_path}${Paths.CATEGORIES}${id}`);
  }

  getPorId(id: number): Observable<any> {
    return this.http.get(`${environment.base_path}${Paths.CATEGORIES}${id}`);
  }

  getAllPorNome(nome: string): Observable<any> {
    return this.http.get(`${environment.base_path}${Paths.CATEGORIES}${Paths.SEARCH}${nome}`);
  }

}
