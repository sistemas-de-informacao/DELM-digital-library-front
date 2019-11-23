import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

// Models
import { Category } from './../../../../models/category';
import { ResponseDefault } from 'src/app/models/response-default';

// Services
import { CategoryService } from './../../../../services/category.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  pesquisarFormGroup: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private alertService: AlertService) { }

  ngOnInit() {
    this.criarForms();
    this.listar();
    this.search();
  }

  criarForms() {
    this.pesquisarFormGroup = this.fb.group({
      nome: [null, [Validators.required]],
    });
  }

  listar(search?: boolean) {
    this.categoryService.listar().subscribe((categories: Category[]) => {
      this.categories = categories;
      if (search) {
        this.pesquisarFormGroup.reset();
      }
    });
  }

  search() {
    this.pesquisarFormGroup.get('nome').valueChanges.pipe(
      map(value => value ? value.trim() : value),
      filter(value => value ? value.length >= 3 : value),
      debounceTime(350),
      distinctUntilChanged(),
      tap(value => this.getPorNome(value))
    ).subscribe();

    this.pesquisarFormGroup.get('nome').valueChanges.pipe(
      map(value => value ? value.trim() : value),
      filter(value => value.length === 0),
      tap(() => this.listar())
    ).subscribe();
  }

  getPorNome(nome: string) {
    this.categoryService.getAllPorNome(nome).subscribe((res: ResponseDefault<Array<Category>>) => {
      if (res.body) {
        this.categories = res.body;
      } else {
        this.alertService.danger(res.mensagem);
        this.listar();
      }
    }, (err: any) => {
      this.alertService.danger(err.error.text);
      this.listar();
    });
  }

  redirecionarParaCategoria(id: any) {
    this.router.navigate(['dashboard/editar-categoria/' + 'id'], { queryParams: { id } });
  }

}
