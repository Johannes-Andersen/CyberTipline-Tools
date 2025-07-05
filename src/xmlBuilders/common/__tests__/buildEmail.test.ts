import { describe, it } from 'node:test';
import { type Email, EmailType } from '../../../types';
import { buildEmail } from '../buildEmail';

describe('buildEmail', () => {
  it('should build a verified email', ({ assert }) => {
    const email: Email = {
      email: 'example@example.com',
      type: EmailType.Work,
      verified: true,
      verificationDate: new Date('2024-01-01T00:00:00.000Z'),
    };

    const result = buildEmail(email);

    assert.snapshot(result);
  });

  it('should build an unverified email', ({ assert }) => {
    const email: Email = {
      email: 'example@example.com',
      type: EmailType.Work,
      verified: false,
    };

    const result = buildEmail(email);

    assert.snapshot(result);
  });

  it('should build an email with unknown verification status', ({ assert }) => {
    const email: Email = {
      email: 'example@example.com',
      type: EmailType.Work,
    };

    const result = buildEmail(email);

    assert.snapshot(result);
  });
});
