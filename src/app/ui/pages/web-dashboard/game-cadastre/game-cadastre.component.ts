import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, PatternValidator } from '@angular/forms';

// Models
import { GameCadastreForm } from '../../../../models/forms/game-form';
import { Game } from 'src/app/models/game';
import { Category } from 'src/app/models/category';
import { ResponseDefault } from './../../../../models/response-default';

// Services
import { GameService } from 'src/app/services/game.service';
import { CategoryService } from './../../../../services/category.service';
import { DateService } from 'src/app/services/date.service';
import { AlertService } from 'ngx-alerts';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-game-cadastre',
  templateUrl: './game-cadastre.component.html',
  styleUrls: ['./game-cadastre.component.scss']
})

export class GameCadastreComponent implements OnInit {

  gameForm: GameCadastreForm;
  game: Game;

  gameFormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.maxLength(120)]],
    preco: [null, [Validators.required]],
    dataLancamento: [null, [Validators.required]],
    desenvolvedor: [null, [Validators.required, Validators.maxLength(45)]],
    descricao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
    categoria: [null, [Validators.required]]
  });

  loading = false;

  categorias: Category[] = [];
  categoriasLoading = true;

  file: File;
  ref: AngularFireStorageReference;

  constructor(private fb: FormBuilder, private gameService: GameService,
    private categoryService: CategoryService, private alertService: AlertService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.listarCategorias();

  }

  onSubmitCriarJogo() {
    this.gameForm = new GameCadastreForm(this.gameFormGroup);
    this.criarJogo();
  }

  listarCategorias() {
    this.categoryService.listar().subscribe((categorias: Category[]) => {
      if (categorias) {
        this.categorias = categorias;
      }

      this.categoriasLoading = false;
    });
  }

  criarJogo() {
    this.loading = true;
    this.game = new Game(this.gameForm.nome, this.gameForm.preco, DateService.converterData(this.gameForm.dataLancamento), this.gameForm.desenvolvedor, this.gameForm.descricao, 1);
    this.gameService.criar(this.game).subscribe((res: ResponseDefault<Game>) => {
      if (res.body) {
        this.uploadCapaParaStorage(res.body.id.toString(), ((callback: any) => {
          this.gameForm = null;
          this.gameFormGroup.reset();
          this.file = null;
          if (callback !== false) {
            const fullPath = callback.metadata.fullPath;
            this.game.fullPath = fullPath;
            this.gameService.editarPorNome(this.game).subscribe(() => {
              if (res.body) {
                this.alertService.success(res.mensagem);
                this.loading = false;
              } else {
                this.alertService.warning(res.mensagem);
                this.loading = false;
              }
            })
          } else {
            this.alertService.warning(res.mensagem.concat(', mas a imagem não foi armazenada.'));
            this.loading = false;
          }
        }));
      } else {
        this.alertService.danger(res.mensagem);
        this.loading = false;
      }
    });
  }

  atualizarList(categorias: Category[]) {
    this.categorias = categorias;
    this.gameFormGroup.get('categoria').setValue(categorias[0].id);
  }

  onUploadCapa(event: any) {
    this.file = event.target.files[0];
  }

  async uploadCapaParaStorage(id: string, resolve) {
    this.ref = this.storage.ref(id);
    await this.ref.put(this.file).then((res) => resolve(res)).catch((res) => resolve(false));
  }

}
