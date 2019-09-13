import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  public contact: Contact;

  constructor(
    private route: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    public service: DataService
  ) { }

  ngOnInit() { }

  select(contact: Contact) {
    console.log(contact);
    this.contact = contact;

    sessionStorage.setItem('contact', JSON.stringify(this.contact));
    this.route.navigate(['update', contact.id]);
  }

  async presentAlertConfirm(contact: Contact) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Do you really want to delete this contact of the ${contact.name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.delete(contact.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async delete(id: string) {
    const loading = await this.loadingCtrl.create({ message: "Aguarde, excluindo..." });
    loading.present();

    this.service
      .delete(id)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess();

          this.route.navigate(['/']);
        },
        (err) => {
          loading.dismiss();
          console.log(err);
          this.showError("Falha ao excluir.");
        },
        () => {
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

  async showSuccess() {
    const toast = await this.alertController.create({
      message: 'Contato excluído com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('/');
        }
      }]
    });

    toast.present();
  }
}
