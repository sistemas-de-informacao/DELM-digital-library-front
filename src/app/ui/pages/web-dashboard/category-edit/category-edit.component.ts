import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Models
import { Category } from './../../../../models/category';
import { ResponseDefault } from './../../../../models/response-default';

// Services
import { AlertService } from 'ngx-alerts';
import { CategoryService } from './../../../../services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})

export class CategoryEditComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: Category;

  id: number;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private categoriaService: CategoryService, private alertService: AlertService) { }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.categoriaService.getPorId(this.id).subscribe((categoria: Category) => {
        this.categoria = categoria;
        this.criarForms();
      });
    });
  }

  criarForms() {
    this.categoriaForm = this.fb.group({
      nome: [this.categoria.nome, [Validators.required, Validators.maxLength(120)]]
    });
  }

  onSubmitEditarCategoria() {
    this.categoria = new Category(this.categoriaForm.get('nome').value, this.id);
    this.editarCategoria(this.categoria);
  }

  editarCategoria(categoria: Category) {
    this.categoriaService.editar(categoria).subscribe((res: ResponseDefault<Category>) => {
      if (res.body) {
        this.alertService.success(res.mensagem);
      } else {
        this.alertService.danger(res.mensagem);
      }
    }, (res: ResponseDefault<Category>) => this.alertService.danger(res.mensagem));
  }

}
