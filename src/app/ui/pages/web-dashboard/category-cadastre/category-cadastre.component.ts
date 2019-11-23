import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// Models
import { Category } from './../../../../models/category';
import { ResponseDefault } from './../../../../models/response-default';

// Services
import { CategoryService } from './../../../../services/category.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-category-cadastre',
  templateUrl: './category-cadastre.component.html',
  styleUrls: ['./category-cadastre.component.scss']
})

export class CategoryCadastreComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: Category;

  loading = false;

  @Output() atualizarLista = new EventEmitter();

  constructor(private fb: FormBuilder, private categoriaService: CategoryService, private alertService: AlertService) { }

  ngOnInit() {
    this.criarForms();
  }

  criarForms() {
    this.categoriaForm = this.fb.group({
      nome: [null, [Validators.required, Validators.maxLength(120)]]
    });
  }

  onSubmitCriarCategoria() {
    this.categoria = new Category(this.categoriaForm.get('nome').value);
    this.criarCategoria(this.categoria);
  }

  async criarCategoria(categoria: Category) {
    this.loading = true;
    this.categoriaService.criar(categoria).subscribe((res: ResponseDefault<Category>) => {
      this.listarCategorias(res);


    }, (res: ResponseDefault<Category>) => {
      this.alertService.danger(res.mensagem);
      this.loading = false;
    });
  }

  listarCategorias(res: ResponseDefault<Category>) {
    return this.categoriaService.listar().subscribe((categorias: Category[]) => {
      if (res.body) {
        this.categoriaForm.reset();
        this.alertService.success(res.mensagem);
        this.atualizarLista.emit(categorias);
      } else {
        this.alertService.danger(res.mensagem);
      }

      this.loading = false;
    });
  }

}
