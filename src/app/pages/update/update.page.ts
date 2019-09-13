import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  id: string;
  public contact: Contact;

  constructor(
  ) {
  }

  ngOnInit() {
    let session = sessionStorage.getItem('contact');
    this.contact = JSON.parse(session);
  }
}
