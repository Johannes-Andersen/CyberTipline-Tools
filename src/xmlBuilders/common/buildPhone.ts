import { XMLBuilder } from 'fast-xml-parser';
import type { Phone } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildPhone = (phone: Phone, keyName = 'phone'): string =>
  builder.build({
    [keyName]: {
      '@_type': phone.type,
      '@_verified': phone.verified,
      '@_verificationDate': phone.verificationDate?.toISOString(),
      '@_countryCallingCode': phone.countryCallingCode,
      '@_extension': phone.extension,
      '#text': phone.number,
    },
  });
