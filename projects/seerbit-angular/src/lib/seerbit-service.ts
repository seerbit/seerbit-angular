import { Injectable } from '@angular/core';
import { SeerBitOptions } from './models/SeerBitOptions';

interface MyWindow extends Window {
  SeerbitPay: { pay(options: Partial<SeerBitOptions>): { openIframe(): any } };
}

declare var window: MyWindow;

@Injectable({
  providedIn: 'root'
})
export class SeerbitService {
  constructor() { }

  loadScript(): Promise<void> {
    return new Promise(resolve => {
      if (window.SeerbitPay && typeof window.SeerbitPay.pay === 'function') {
        resolve();
        return;
      }
      const script = window.document.createElement('script');
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener('load', onLoadFunc);
        resolve();
      };
      script.addEventListener('load', onLoadFunc);
      script.setAttribute('src', 'https://checkout.seerbitapi.com/api/v2/seerbit.js');
    });
  }
  getSeerBitOptions(obj: SeerBitOptions): SeerBitOptions {
    return {
      amount: obj.amount,
      tranref: obj.tranref,
      public_key: obj.public_key,
      currency: obj.currency || 'NGN',
      callbackurl: obj.callbackurl || '',
      country: obj.country,
      description: obj.description,
      email: obj.email || '',
      mobile_no: obj.mobile_no || '',
      full_name: obj.full_name || '',
      setAmountByCustomer: obj.setAmountByCustomer || false,
      close_prompt: obj.close_prompt || false,
      close_on_success: obj.close_on_success || false,
      customization: obj.customization || null,
      tokenize: obj.tokenize || false,
      planId: obj.planId || ''
    };
  }
  checkInput(obj: Partial<SeerBitOptions>): string {
    if (!obj.public_key) {
      return 'SeerBit: Please insert a your public key';
    }
    if (!obj.amount) {
      return 'SeerBit: Transaction amount cannot be empty';
    }
    if (!obj.tranref) {
      return 'SeerBit: Transaction ref cannot be empty';
    }
    return '';
  }
}
