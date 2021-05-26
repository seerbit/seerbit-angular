import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SeerbitService } from './seerbit-service';
import { SeerBitOptions, PrivateSeerBitOptions } from './models/SeerBitOptions';
interface MyWindow extends Window {
  SeerbitPay:
  {
    (options: any,
     callback: any,
     close: any
      )
  };
}
declare var window: MyWindow;
@Directive({
  selector: '[seerbit-ng]'
})
export class SeerBitButtonDirective {
  @Input() options: any;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() validationError: EventEmitter<any> = new EventEmitter<any>();
  private _options: Partial<PrivateSeerBitOptions>;
  closeFn: any;
  callbackFn: any;
  errorFn: any;
  constructor(private seerBitService: SeerbitService) {

  }

  async pay() {
    const errorText = this.validateInput(this.options);

    this.generateOptions(this.options);

    if (errorText) {
      console.error(errorText);
      this.validationError.emit(errorText);
      return errorText;
    }
    await this.seerBitService.loadScript();
    window.SeerbitPay(this._options, this.callbackFn, this.closeFn);
  }
  generateOptions(obj: any) {
    this._options = this.seerBitService.getSeerBitOptions(obj);
    this.closeFn = (...response) => {
      if (this.close.observers.length) {
        this.close.emit(...response);
      }
    };
    this.callbackFn = (...response) => {
      this.callback.emit(...response);
    };
  }
  validateInput(obj: SeerBitOptions) {
    if (!this.callback.observers.length) {
      return 'SeerBit: Insert a callback function like so (callback)=\'PaymentComplete($event)\' to check payment status';
    }
    return this.seerBitService.checkInput(obj);
  }
  @HostListener('click')
  async buttonClick() {
    this.pay();
  }
}
