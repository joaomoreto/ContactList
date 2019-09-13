import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
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
      email: ['', Validators.compose([
        CustomValidator.EmailValidator,
        Validators.required
      ])]
    })
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Aguarde, resetando..." });
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
          this.showError("Falha ao resetar senha.");
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
      message: 'Senha resetada com sucesso, verifique seu e-mail!',
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
