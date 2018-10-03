import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransactionPage } from './../transaction/transaction';

import { AppProvider } from './../../providers/app/app';

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public appService: AppProvider) {

  }

  rates: any = []
  transactions: any = []

  ionViewDidLoad() {
    this.appService.getRates()
      .then(val => {
        this.rates = val
      })

    this.appService.getTransactions()
      .then(val => {
        this.transactions = val
      })
  }

  getUniqueTransactionsSku(): string[] {
    return [...new Set(this.transactions.map(item => item.sku))];;
  }

  getTransactionCount(sku: String): number {
    return this.transactions.reduce((acc, cur) => cur.sku === sku ? ++acc : acc, 0);
  }

  goToTransactionDetail(selectTransaction) {
    this.navCtrl.push(TransactionPage, {
      sku: selectTransaction,
      rates: this.rates,
      transactions: this.transactions.filter(i => i.sku === selectTransaction)
    })
  }

}
