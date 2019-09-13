import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private service: DataService
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
      username: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
    })
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Aguarde, criando..." });
    loading.present();

    this.service
      .createCustomer(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess();
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showError("Falha ao cadastrar.");
        }
      )
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Close'
    });

    toast.present();
  }

  async showSuccess() {
    const toast = await this.alertCtrl.create({
      message: 'Bem-vindo ao Contact List!',
      buttons: [{
        text: 'Continuar',
        handler: () => {
          this.navCtrl.navigateRoot('/login');
        }
      }]
    });

    toast.present();
  }

}
