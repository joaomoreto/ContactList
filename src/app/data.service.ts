import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  createCustomer(data: any) {
    return this.http.post(`${environment.apiUrl}account`, data);
  }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}accounts/auth`, data);
  }

  getContacts() {
    return this.http.get(`${environment.apiUrl}contacts`);
  }

  save(data: any) {
    return this.http.post(`${environment.apiUrl}contact`, data);
  }

  //Update deveria ser por ID. Foi criado outro por estar utilizando Mockoon.
  // update(data: Contact) {
  //   return this.http.put(`${environment.apiUrl}contacts/${data.id}`, data);
  // }

  update(data: Contact) {
    return this.http.put(`${environment.apiUrl}contact`, data);
  }

  //Delete deveria ser por ID. Foi criado outro por estar utilizando Mockoon.
  // delete(data: Contact) {
  //   return this.http.delete(`${environment.apiUrl}contact/${data.id}`);
  // }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}contact`);
  }
}