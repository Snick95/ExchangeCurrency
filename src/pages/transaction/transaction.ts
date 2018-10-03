import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionPage {

  exchangeTo: string = 'EUR'
  sku: string = ''
  convertions: any = []
  transactions: any = []
  totalAmount: number = 0

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.sku = navParams.get('sku')
    this.convertions = navParams.get('rates')
    this.transactions = navParams.get('transactions')
  }

  ionViewDidLoad() {
    this.transactions.forEach(currTransaction => {
      if (currTransaction.currency === this.exchangeTo) {
        currTransaction.amountConverted = this.roundAmount(currTransaction.amount)
      } else {
        currTransaction.amountConverted = this.RecursiveFindConversion(this.convertions, currTransaction.currency, '', currTransaction.amount)
      }
    });
    this.totalAmount = this.transactions.reduce(function (prev, cur) {
      return prev + cur.amountConverted;
    }, 0);
    this.totalAmount = this.roundAmount(this.totalAmount)
  }

  RecursiveFindConversion(conversions: any, currentFrom: string, lastFrom: string, amount: number): any {
    let directConvert = conversions.find(i => i.from === currentFrom && i.to === this.exchangeTo)
    if (!directConvert) {
      let possibleConvert = conversions.find(x => x.from === currentFrom && x.to != lastFrom)
      if (possibleConvert) {
        amount = amount * possibleConvert.rate
        return this.RecursiveFindConversion(conversions, possibleConvert.to, possibleConvert.from, amount)
      }
      return 'x'
    }
    return this.roundAmount(directConvert.rate * amount)
  }

  roundAmount(amount: any): number {
    return Math.round(amount * 100) / 100
  }

}