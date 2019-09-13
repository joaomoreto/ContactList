import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contacts: Contact[];
  public contact: Contact;
  public listMode: boolean = true;

  constructor(
    private service: DataService,
    private route: Router
  ) { }

  ngOnInit() {
    this.service.getContacts()
      .subscribe(
        (res: any) => {
          this.contacts = res;
        }
      )
  }

  newContact() {
    this.contact = new Contact("", "", "", "", "", "", "");
    this.contact = this.contact;

    this.route.navigate(['create']);
  }

  toggleMode() {
    this.listMode = !this.listMode;
  }
}
