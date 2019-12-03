import { ResponseDefault } from './../../../../models/response-default';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Models
import { Game } from './../../../../models/game';
import { GameCadastreForm } from './../../../../models/forms/game-form';

// Services
import { GameService } from './../../../../services/game.service';
import { DateService } from './../../../../services/date.service';
import { AlertService } from 'ngx-alerts';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})

export class GameEditComponent implements OnInit {

  game: Game;
  id: number;

  gameForm: GameCadastreForm;
  gameFormGroup: FormGroup;

  file: File;
  ref: AngularFireStorageReference;

  antigo: string;

  loading: boolean;

  isNovaImagemBoolean: boolean;

  fullPath: string;
  preview: string | ArrayBuffer = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private gameService: GameService, private alertService: AlertService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getGame();
  }

  getGame() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id;
      this.gameService.getPorId(this.id).subscribe((game: Game) => {
        this.game = game;
        this.game.dataLancamento = DateService.converterDataComIfen(this.game.dataLancamento);
        this.criarForms();
        this.getNomeAntigo();
        this.getImagemAtual(this.game.id.toString());
      });
    });
  }

  getNomeAntigo() {
    this.antigo = this.game.nome;
  }

  criarForms() {
    this.gameFormGroup = this.fb.group({
      nome: [this.game.nome, [Validators.required, Validators.maxLength(120)]],
      preco: [this.game.preco, [Validators.required]],
      dataLancamento: [this.game.dataLancamento, [Validators.required]],
      desenvolvedor: [this.game.desenvolvedor, [Validators.required, Validators.maxLength(45)]],
      descricao: [this.game.descricao, [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
      categoria: [this.game.idCategoria, [Validators.required]]
    });
  }

  onSubmitToEdit() {
    this.gameForm = new GameCadastreForm(this.gameFormGroup);
    this.editar();
  }

  editar() {
    this.loading = true;
    this.game = new Game(this.gameForm.nome, this.gameForm.preco, DateService.converterData(this.gameForm.dataLancamento), this.gameForm.desenvolvedor, this.gameForm.descricao, 1, undefined, this.id);
    this.gameService.editar(this.game).subscribe((res: ResponseDefault<Game>) => {
      if (res.body) {
        if (this.isNovaImagem()) {
          this.storage.ref(this.game.id.toString()).delete().subscribe(() => {
            this.uploadCapaParaStorage(res.body.id.toString(), ((callback: any) => {
              this.editarImagemNoBanco(callback, res);
            }));
          }, () => {
            this.uploadCapaParaStorage(res.body.id.toString(), ((callback: any) => {
              this.editarImagemNoBanco(callback, res);
            }));
          });
        } else {
          this.alertService.success(res.mensagem);
          this.loading = false;
        }
      } else {
        this.alertService.danger(res.mensagem);
        this.loading = false;
      }
    }, (res: ResponseDefault<Game>) => { this.alertService.danger(res.mensagem); this.loading = false; });
  }

  editarImagemNoBanco(callback, res) {
    if (callback !== false) {
      const fullPath = callback.metadata.fullPath;
      this.game.fullPath = fullPath;
      this.gameService.editarPorNome(this.game).subscribe(() => {
        if (res.body) {
          this.alertService.success(res.mensagem);
          this.resetarCampos();
        } else {
          this.alertService.warning(res.mensagem);
          this.resetarCampos();
        }
      });
    } else {
      this.alertService.warning(res.mensagem.concat(', mas a imagem não foi armazenada.'));
      this.loading = false;
    }
  }

  resetarCampos() {
    this.getGame();
    this.isNovaImagemBoolean = false;
    this.loading = false;
  }

  getImagemAtual(antigo: string) {
    const nome = antigo;

    this.storage.ref(nome).getDownloadURL().subscribe((res) => {
      this.fullPath = res;
    }, () => this.alertService.warning('Não foi possível fazer download da imagem'))

    this.storage.ref(nome).getMetadata().subscribe((imagem: any) => {
      this.file = imagem;
    }, () => this.alertService.warning('O jogo não tem capa, faça upload de uma imagem'));
  }

  isNovaImagem() {
    if (this.isNovaImagemBoolean === true) {
      return true;
    } else {
      return false;
    }
  }

  onUploadCapa(event: any) {
    this.file = event.target.files[0];
    this.isNovaImagemBoolean = true;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.preview = reader.result;

      reader.readAsDataURL(file);
    }
  }

  async uploadCapaParaStorage(id: string, resolve) {
    this.ref = this.storage.ref(id);
    await this.ref.put(this.file).then((res) => resolve(res)).catch((res) => resolve(false));
  }

}
