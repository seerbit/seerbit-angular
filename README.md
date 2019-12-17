<div align="center">
 <img width="200" valign="top" src="https://res.cloudinary.com/dy2dagugp/image/upload/v1571249658/seerbit-logo_mdinom.png">
</div>


<h1 align="center">
  <img width="40" valign="bottom" src="https://angular.io/assets/images/logos/angular/angular.svg">
  angular-seerbit
</h1>

<h4 align="center">
  An Angular 8 wrapper for SeerBit inline script
</h4>

## Features

* The library enables easy integration with Angular.
* Integrate as a Component
* Integrate as a Directive

## Getting started

A full getting started guide for integrating SeerBit can be found at [getting started docs](https://doc.seerbit.com).

## Documentation

The documentation, installation guide, detailed description of the SeerBit API and all of its features is [available on the documentation website](https://doc.seerbit.com/api/library).


## Requirements

* Angular 2 and higher


## Installation
You can use NPM to include the library in your project

### NPM

```bash
npm install --save seerbit-angular
```

## Inject the library

Import the `NgSeerBitModule` into your application (most likely your checkout module)

```typescript
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


## Implementation in your Component
```typescript
import { Component } from '@angular/core';
import {PRODUCTS} from './mock.products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seerbit-anguar-demo';
  
  PaymentDone(response) {
    console.log(response) /*event handler with a response after a transaction*/
  }
  PaymentCancel(response) {/*event handler when shopper closes payment modal*/
    
  }

  options = {
    "tranref": new Date().getTime(),
    "currency": "NGN",
    "description": "Shopper purchased an item",
    "country": "NG",
    "amount": 2000,
    "callbackurl": "localhost:4200",//Replace this with your URL available on the WWW
    "public_key": "PUBLIC_KEY", //replace this with your own public key from your Merchant Dashboard
  };
}
```

## Implementation in your Component Template

## As a Component 

```ts
<seerbit-ng class="your-custom-class" (callback)="PaymentDone($event)" (close)="PaymentCancel($event)" [options]="options">
Trigger Payment Modal as a Component
</seerbit-ng>
```
A caveat for implementing as a component requires your styling to available globally for the component to inherit them.<br>

## As a Directive

```ts
<button class="your-custom-class" seerbit-ng (callback)="PaymentDone($event)" (close)="PaymentCancel($event)" [options]="options">
Trigger Payment Modal as a Component
</button>
```
## Examples

You can also check the [projects/seerbit-anguar-demo folder](https://github.com/seerbit/seerbit-angular/tree/master/projects/seerbit-anguar-demo) in this repository for more examples of usage.

## A Shopping cart example

<strong>App Component</strong>

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
  available_quantities = [1,2,3]

  PaymentDone(response) {
    console.log(response) /*response of transaction*/
  }
  PaymentCancel(response) {
    
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
    "callbackurl": "localhost:4200",//Replace this with URL available on the WWW
    "public_key": "SBPUBK_CECPLUSINMDQIHH3GYV2NNYHGPV9JEKQ", //replace this with your own public key from your Merchant Dashboard
  };
}

```

<strong>Product mock data and product type</strong>

```ts
import { Product } from './product';

export const PRODUCTS: Product[] = [
  { id: 11, name: 'Product 1', price:4000, description:'A description of product 1',qty:1 },
  { id: 12, name: 'Product 2', price:8000, description:'A description of product 2',qty:1 },
];


export class Product {
    id: number;
    name: string;
    description:string;
    price:number;
    qty:number
  }

```

<strong>Component Template</strong>

```html
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
<div class="bg"></div>
```

## Website
* https://doc.seerbit.com
