import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Models
import { Category } from './../../../../models/category';

// Services
import { CategoryService } from './../../../../services/category.service';




@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  pesquisarFormGroup: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.listar();
    this.criarForms();
  }

  criarForms() {
    this.pesquisarFormGroup = this.fb.group({
      pesquisar: [null, [Validators.required]],
    })
  }

  redirecionarParaCategoria(id: any) {
    this.router.navigate(['dashboard/editar-categoria/' + 'id'], { queryParams: { id } });
  }

  listar() {
    this.categoryService.listar().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

}
