import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  public contact: Contact;

  constructor(
    private navCtrl: NavController,
    private route: Router
  ) { }

  ngOnInit() {
  }

  newContact() {
    this.contact = new Contact("", "", "", "", "", "", "");
    this.contact = this.contact;

    this.route.navigate(['create']);
  }

  logout() {
    UserUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
