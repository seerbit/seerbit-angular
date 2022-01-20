import { EventEmitter } from '@angular/core';

interface SeerBitOptionsCustomisationTheme {
  border_color?: string;
  background_color?: string;
  button_color?: string;
}

interface SeerBitOptionsCustomisation {
  /**
   * UI Customisation properties.
   */
  theme?: SeerBitOptionsCustomisationTheme;
  /**
   * Array of allowed Payment methods  e.g ["card", "account", "transfer", "wallet", "ussd"].
   */
  payment_method?: string[];
  /**
   * Merchant Logo. Can be a URL or base64.
   */
  logo?: string;
  /**
   * Display Confetti after a successful transaction.
   */
  confetti?: boolean;
}
export interface SeerBitOptions {
  /**
   * Amount to withdraw (in kobo for NGN)
   */
  amount: string | number;
  /**
   * A flat fee to charge the subaccount for this transaction, in kobo.
   */
  tranref: number | string;
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
  email?: string;
  /**
   * A valid shopper's phone number
   */
  mobile_no?: string;
  /**
   * A valid shopper's full name: John Smith
   */
  full_name?: string;
  /**
   * Allow the customer/shopper input an amount
   */
  setAmountByCustomer?: boolean;
  /**
   */
  /**
   * Disable the prompt when the cancel button is closed
   */
  close_prompt?: boolean;
  /**
   * Immediately close the checkout after a successful transaction
   */
  close_on_success?: boolean;
  /**
   * Customise the look and feel of your checkout
   */
  customization?: SeerBitOptionsCustomisation;
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
