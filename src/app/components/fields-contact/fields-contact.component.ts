import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-fields-contact',
  templateUrl: './fields-contact.component.html',
  styleUrls: ['./fields-contact.component.scss'],
})
export class FieldsContactComponent implements OnInit {
  public form: FormGroup;
  @Input() contact: Contact = new Contact("", "", "", "", "", "", "");

  constructor(
    private fb: FormBuilder,
    private route: Router,
    public service: DataService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(40),
        Validators.required
      ])],
      email: ['', Validators.compose([
        CustomValidator.EmailValidator,
        Validators.required
      ])],
      document: ['', Validators.compose([
        CustomValidator.isCpf,
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      address: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.required
      ])],
      image: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.form.clearValidators;
    this.form.reset;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.controls['name'].setValue(this.contact.name);
    this.form.controls['email'].setValue(this.contact.email);
    this.form.controls['document'].setValue(this.contact.documentNumber);
    this.form.controls['phone'].setValue(this.contact.phone);
    this.form.controls['address'].setValue(this.contact.fullAddress);
    this.form.controls['image'].setValue(this.contact.image);
  }

  async add() {
    this.form.disable();

    const loading = await this.loadingCtrl.create({ message: "Aguarde, adicionando..." });
    loading.present();

    this.service
      .save(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(true);

          this.route.navigate(['/']);
        },
        (err) => {
          loading.dismiss();
          console.log(err);
          this.showError("Falha ao cadastrar.");

          this.form.enable();
        },
        () => {
          this.form.enable();
        }
      )
  };

  async update() {
    this.form.disable();

    const loading = await this.loadingCtrl.create({ message: "Aguarde, atualizando..." });
    loading.present();

    this.service
      .update(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(false);

          this.route.navigate(['/']);
        },
        (err) => {
          loading.dismiss();
          console.log(err);
          this.showError("Falha ao atualizar.");

          this.form.enable();
        },
        () => {
          this.form.enable();
        }
      )
  };

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Close'
    });

    toast.present();
  }

  async showSuccess(add: boolean) {
    let message: string;

    if (add) {
      message = 'Contato inserido com sucesso!'
    } else {
      message = 'Contato atualizado com sucesso!'
    }

    const toast = await this.alertCtrl.create({
      message: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('/');
        }
      }]
    });

    toast.present();
  }

  return() {
    this.route.navigate(['/']);
  }
}
