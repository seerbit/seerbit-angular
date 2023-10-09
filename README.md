
<p align="center">
<img width="400" valign="top" src="https://assets.seerbitapi.com/images/seerbit_logo_type.png" data-canonical-src="https://res.cloudinary.com/dpejkbof5/image/upload/v1620323718/Seerbit_logo_png_ddcor4.png" style="max-width:100%; ">
</p>


<h1 align="center">
  <img width="40" valign="bottom" src="https://angular.io/assets/images/logos/angular/angular.svg">
  seerbit-angular
</h1>

<h4 align="center">
  An Angular 12 Library for SeerBit payment gateway
</h4>


## Features

* The library enables easy integration with Angular.
* Integrate as a Component
* Integrate as a Directive

## Getting started

* A full getting started guide for integrating SeerBit can be found at [getting started docs](https://doc.seerbit.com)
* Register for a merchant account on [Seerbit Merchant Dashboard](https://dashboard.seerbitapi.com) to get access to integration keys.

## Documentation

The documentation, installation guide, detailed description of the SeerBit API and all of its features is [available on the documentation website](https://doc.seerbit.com/api/library).


## Requirements

* Angular 12 and higher


## Installation
You can use NPM to include the library in your project

### NPM

```bash
npm install --save seerbit-angular
```

## Inject the library

Import the `NgSeerBitModule` into your application (most likely your checkout module)

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgSeerBitModule} from 'seerbit-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,NgSeerBitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Implementation in your Application
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seerbit-anguar-demo';
  
  PaymentDone(res) {/*event handler with a response after a complete transaction*/
    const {response, closeModal} = res;
    console.log('response', response)
    closeModal();
  }
  PaymentCancel(response) {/*event handler when shopper closes payment modal*/
    console.log(response)
  }

  options = {
       tranref: new Date().getTime(),
       currency: 'NGN',
       description: 'TEST PAYMENT',
       country: 'NG',
       email: 'samsmart@emaildomain.com',
       mobile_no: '08011111111',
       full_name: 'Sam Smart',
       amount: 2000,
       setAmountByCustomer: false, 
       close_prompt: false,
       close_on_success: false,
       callbackurl: '', // Replace this with URL available on the WWW
       public_key: 'public_key_from_your_merchant_dashboard', // replace this with your own public key from your Merchant Dashboard
       customization: {
                theme: {
                  border_color: "#000000",
                  background_color: "#004C64",
                  button_color: "#0084A0",
                },
                payment_method: ["card", "account", "transfer", "wallet", 'ussd'],
                display_fee: true, // false
                logo: "logo_url || base64", 
              },
       tokenize: false,
       planId: ""
  };
}
```

## Implementation in your Component Template

## As a Component

```html
<seerbit-ng class="your-custom-class" (callback)="PaymentDone($event)" (close)="PaymentCancel($event)" [options]="options">
Trigger Payment Modal as a Component
</seerbit-ng>
```
A caveat for implementing as a component requires your styling to available globally for the component to inherit them.<br>

## As a Directive

```html
<button class="your-custom-class" seerbit-ng (callback)="PaymentDone($event)" (close)="PaymentCancel($event)" [options]="options">
Trigger Payment Modal as a Component
</button>
```
## Examples

You can also check the [projects/seerbit-anguar-demo folder](https://github.com/seerbit/seerbit-angular/tree/master/projects/seerbit-anguar-demo) in this repository for more examples of usage.

## A Shopping cart example

```html
<strong>App Component</strong>
```

```ts
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
  available_quantities = [1, 2, 3];

  options = {
    tranref: new Date().getTime(),
    currency: "NGN",
    description: "TEST",
    country: "NG",
    email: "test@emaildomain.com",
    mobile_no: "08011111111",
    full_name: "test test",
    amount: this.cart_total_cost,
    setAmountByCustomer: false,
    close_prompt: false,
    close_on_success: false,
    callbackurl: "", // Replace this with URL available on the WWW
    public_key: "public_key_from_your_merchant_dashboard", // replace this with your own public key from your Merchant Dashboard
    customization: {
      theme: {
        border_color: "#4c4c4c",
        background_color: "#61bc6e",
        button_color: "#0000000",
      },
      // payment_method: ["card", "account", "transfer", "wallet", 'ussd'],
      // logo: "logo_url || base64",
    },
    tokenize: false,
    planId: ""
  };

  PaymentDone(response) {
    console.log('callback');
    console.log(response); /*response of transaction*/
  }
  PaymentCancel(response) {
    console.log('cancel');
    console.log(response);
  }

  PaymentPayloadValidationError(error) {
    console.log('payload validation error');
    console.log(error);
  }

  cartTotalCost = () => {
    let total = 0;
    this.cart.map(item => {
      total += item.price * item.qty;
    });
    this.cart_total_cost = total;
    this.options.amount = total;

  }

  cartTotal = () => {
    let total = 0;
    this.cart.map( item => { total = total + Math.floor(item.qty);  });
    this.cartTotalCost();
    return total;
  }

  removeItem(product) {
    this.cart = this.cart.filter( item => item.id != product.id);
  }

  updateCart(product, qty: number) {
    this.cart.map( item => {
        item.id == product.id ? item.qty = Math.floor(qty) : null;
        return item;
      }
    );
    this.cartTotalCost();

  }
}
```

```html
<strong>Product mock data and product type</strong>
```

```ts
export class Product {
  id: number;
  name: string;
  description:string;
  price:number;
  qty:number
}

```

```ts
import { Product } from './product';

export const PRODUCTS: Product[] = [
  { id: 11, name: 'Product 1', price:4000, description:'A description of product 1',qty:1 },
  { id: 12, name: 'Product 2', price:8000, description:'A description of product 2',qty:1 },
];
```


```html
<strong>Component Template</strong>
<div class="center-wrapper">
  <div class="content">
    <nav>
      <a href="#" class="menu">Menu</a>
      <h1 class="logo">demo Shop</h1>
      <div class="icons">
        <i class="fas fa-search"></i>
        <i class="fas fa-shopping-bag"></i><span style="margin-left: 0.3rem;">{{cartTotal()}}</span>
      </div>
    </nav>
    <div class="top-bar">
      <i class="fas fa-arrow-left"></i>
      <span>Continue shopping</span>
    </div>
    <div class="bag">
      <p class="bag-head"><span style="text-transform: uppercase">Your Bag</span> - {{cartTotal()}} item</p>
    </div>
    <div class="bag-product" *ngFor="let product of cart">
      <div class="description">

        <h1>{{product.name}}</h1>
        <p class="description-text">{{product.description}}.</p>
        <h2>N{{product.price}}</h2>
        <div class="quantity-wrapper">
          <div>
            <label for="quantity" style="margin-right: 0.5rem;">Quantity:</label>
            <select name="quantity" style="margin-bottom: 1rem;" (change)="updateCart(product, $event.target.value)">
              <option value disabled>Please select</option>
              <option value={{qty}} [selected]="qty == product.qty" *ngFor="let qty of available_quantities">{{qty}}</option>

            </select>
          </div>
          <button class="btn-remove" (click)="removeItem(product)">Remove</button>
        </div>
      </div>
    </div>
    <div class="bag-total">
      <div class="subtotal">
        <p class="small">Subtotal:</p>
        <p class="small">N{{cart_total_cost}}</p>
      </div>
      <div class="delivery">
        <p class="small">Delivery (Standard - 2 working days):</p>
        <p class="small">Free</p>
      </div>
      <div class="total">
        <h3>Total:</h3>
        <h3>N{{cart_total_cost}}</h3>
      </div>
      <button class="btn-go-checkout" seerbit-ng (callback)="PaymentDone($event)" (close)="PaymentCancel($event)"
              [options]="options">
        <i class="fas fa-lock"></i>
        <span>Pay (Button as a Directive)</span>
      </button>
      <seerbit-ng class="btn-go-checkout" (callback)="PaymentDone($event)" (close)="PaymentCancel($event)" [options]="options">
        Pay (Button as a Component)
      </seerbit-ng>

    </div>

  </div>
</div>
```


```html
<strong>Component Template CSS</strong>
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-size: 16px;
  font-weight: 400;
}

.center-wrapper {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
}

.content {
  margin: 0 auto;
  max-width: 600px;
  width: 500px;
  border: 1px solid lemonchiffon;
  background: white;
}

nav,
.top-bar,
.bag,
.bag-total,
.help {
  padding: 0.5rem 1rem;
}

nav,
a,
.btn-go-checkout {
  color: white;
}

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: #03375E;
}

a {
  padding: 0.2rem 0.5rem;
  border: 2px solid white;
  text-decoration: none;
}

.logo {
  font-family: "Space Mono", sans-serif;
}

.logo,
button {
  text-transform: uppercase;
}

.top-bar,
.bag-head::after,
.bag-total::before {
  background: whitesmoke;
}

.bag-head::after,
.bag-total::before,
.btn-remove {
  display: block;
}

.bag-head::after,
.bag-total::before,
.description-text{
  margin: 0.5rem 0;
}

.bag-head::after,
.bag-total::before {
  content: "";
  width: 100%;
  height: 3px;
}

.muted {
  color: grey;
}

h1 {
  font-size: 1rem;
}

h2 {
  font-size: .8rem;
}

.image {
  width: 40%;
}
.image img.product-image {
  max-width: 100%;
}

.description {
  padding: 1rem;
  width: 100%;
}

select {
  padding: 0.3rem;
  width: 80px;
}

select,
button,
input[type="text"] {
  height: 20px;
}

button {
  cursor: pointer;
  width: 100px;
  background: none;
  border: 2px solid #0D6CB4;
}

.quantity-wrapper {
  align-items: flex-start;
  flex-flow: row wrap;
  margin: 1rem 0 0.5rem;
}

select {
  width: 50px;
  margin-right: 1rem;
}

.bag-product,
.quantity-wrapper,
.subtotal,
.delivery,
.total {
  display: flex;
  justify-content: space-between;
}

.subtotal,
.delivery,
input[type="checkbox"],
.help {
  margin-bottom: 0.5rem;
}

.total {
  margin-bottom: 1rem;
}


input[type="text"],
.btn-go-checkout {
  font-size: 1rem;
}

input[type="text"] {
  width: calc(100% - 100px - 1rem);
  padding: 0.5rem;
}

.btn-go-checkout {
  margin-top: 1rem;
  width: 100%;
  height: 40px;
  background: #0D6CB4;
  box-shadow: 0 3px 6px 2px gainsboro;
}
```

## Website
* https://seerbit.com
