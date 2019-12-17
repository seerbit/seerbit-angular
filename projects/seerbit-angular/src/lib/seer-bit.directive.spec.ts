import { SeerBitButtonDirective } from './seer-bit.directive';
import { SeerbitService } from './seerbit-service';

describe('SeerBitButtonDirective', () => {
  it('should create an instance', () => {
    const directive = new SeerBitButtonDirective(new SeerbitService());
    expect(directive).toBeTruthy();
  });
});
