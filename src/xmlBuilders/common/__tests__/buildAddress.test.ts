import { describe, it } from 'node:test';
import { type Address, AddressType } from '../../../types';
import { Country } from '../../../types/Constants/Country';
import { State } from '../../../types/Constants/State';
import { buildAddress } from '../buildAddress';

describe('buildAddress', () => {
  it('should build an American address', ({ assert }) => {
    const address: Address = {
      address: '123 Main St',
      city: 'Anytown',
      state: State.Utah,
      country: Country.UnitedStates,
      zipCode: '12345',
      type: AddressType.Business,
    };

    const result = buildAddress(address);

    assert.snapshot(result);
  });

  it('should build an European address', ({ assert }) => {
    const address: Address = {
      address: 'Calle de la Paz, 1',
      city: 'Madrid',
      nonUsaState: 'SomeRegion',
      country: Country.Spain,
      zipCode: '12345',
      type: AddressType.Business,
    };

    const result = buildAddress(address);

    assert.snapshot(result);
  });
});
