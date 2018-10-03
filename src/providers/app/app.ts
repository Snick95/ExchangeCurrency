import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppProvider {

  apiRatesUrl = "http://www.json-generator.com/api/json/get/bVviQgqKiG?indent=2";
  apiTransactionsUrl = "http://www.json-generator.com/api/json/get/bTzgmQbyqa?indent=2";

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }

  async getRates() {
    return await new Promise(resolve => {
      this.http.get(this.apiRatesUrl)
        .subscribe(data => {
          resolve(data)
        })
    })
  }

  async getTransactions() {
    return await new Promise(resolve => {
      this.http.get(this.apiTransactionsUrl)
        .subscribe(data => {
          resolve(data)
        })
    })
  }

}
