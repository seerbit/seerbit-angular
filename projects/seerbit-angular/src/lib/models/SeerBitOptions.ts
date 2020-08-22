import { EventEmitter } from '@angular/core';

export interface SeerBitOptions {
  /**
   * Amount to withdraw (in kobo for NGN)
   */
  amount: string;
  /**
   * A flat fee to charge the subaccount for this transaction, in kobo.
   */
  tranref: number;
  /**
   * Merchant public key
   */
  public_key: string;
  /**
   * Transaction currency
   */
  currency: string;
  /**
   * Callback URL which will be redirected to after a successful transaction
   */
  callbackurl?: string;
  /**
   * Shopper's country
   */
  country?: string;
  /**
   * Transaction description
   */
  description?: string;
  /**
   * A valid shopper's email address
   */
  email?: string
  /**
   * A valid shopper's phone number
   */
  mobile_no?: string
  /**
   * A valid shopper's full name: John Smith
   */
  full_name?:string
}

export interface PrivateSeerBitOptions extends SeerBitOptions {
  /**
   * A function to be called on successful card charge. User’s can always be redirected to a successful or
   * failed page supplied by the merchant here based on response
   * @param response?: The server response
   */
  callback: (response?: any) => void;
  /**
   * A function to be called when the pay modal is closed.
   */
  close: (response?: any) => void;
}

export interface PrivateSeerBitOptionsWithEmitters extends SeerBitOptions {
  /**
   * A function to be called on successful card charge. User’s can always be redirected to a successful or
   * failed page supplied by the merchant here based on response
   */
  callback: EventEmitter<any>;
  /**
   * A function to be called when the pay modal is closed.
   */
  close: EventEmitter<void>;
}
