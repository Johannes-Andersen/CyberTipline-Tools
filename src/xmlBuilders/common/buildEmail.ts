import { XMLBuilder } from 'fast-xml-parser';
import type { Email } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildEmail = (email: Email, keyName = 'email'): string =>
  builder.build({
    [keyName]: {
      '@_type': email.type,
      '@_verified': email.verified,
      '@_verificationDate': email.verificationDate?.toISOString(),
      '#text': email.email,
    },
  });
