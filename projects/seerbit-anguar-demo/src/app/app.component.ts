import { Component } from '@angular/core';
import {PRODUCTS} from './mock.products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seerbit-anguar-demo';
  cart = [...PRODUCTS];
  cart_total = 0;
  cart_total_cost = 0;
  available_quantities = [1,2,3]

  PaymentDone(response) {
    console.log('callback')
    console.log(response) /*response of transaction*/
  }
  PaymentCancel(response) {
    console.log('cancel')
    console.log(response)
  }

  cartTotalCost = ()=>{
    let total = 0;
    this.cart.map(item=>{
      total += item.price * item.qty
    });
    this.cart_total_cost = total;
    this.options.amount = total;

  }

  cartTotal = ()=>{
    let total = 0;
     this.cart.map( item=> { total = total+Math.floor(item.qty);  });
     this.cartTotalCost()
     return total;
  }

  removeItem(product){
    this.cart = this.cart.filter( item=> {return item.id != product.id})
  }

  updateCart(product, qty:number){
    this.cart.map( item=> {
      item.id == product.id ? item.qty = Math.floor(qty) : null;
      return item;
    }
    );
    this.cartTotalCost()
   
  }

  options = {
    "tranref": new Date().getTime(),
    "currency": "NGN",
    "description": "TEST",
    "country": "NG",
    "amount": this.cart_total_cost,
    "callbackurl": "",//Replace this with URL available on the WWW
    "public_key": "SBTESTPUBK_dhrpzbRpR34l6VmqkCFOKA94L5E1jSTu", //replace this with your own public key from your Merchant Dashboard
  };
}
