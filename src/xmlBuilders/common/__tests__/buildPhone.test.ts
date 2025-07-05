import { describe, it } from 'node:test';
import { type Phone, PhoneType } from '../../../types';
import { buildPhone } from '../buildPhone';

describe('buildPhone', () => {
  it('should build a verified phone number', ({ assert }) => {
    const phone: Phone = {
      number: '123-456-7890',
      countryCallingCode: '+99',
      verified: true,
      extension: '123',
      verificationDate: new Date('2024-01-01'),
      type: PhoneType.Mobile,
    };

    const result = buildPhone(phone);

    assert.snapshot(result);
  });

  it('should build a unverified phone number', ({ assert }) => {
    const phone: Phone = {
      number: '123-456-7890',
      countryCallingCode: '+99',
      verified: false,
    };

    const result = buildPhone(phone);

    assert.snapshot(result);
  });

  it('should build a phone number with only the number', ({ assert }) => {
    const phone: Phone = {
      number: '123-456-7890',
    };

    const result = buildPhone(phone);

    assert.snapshot(result);
  });
});
