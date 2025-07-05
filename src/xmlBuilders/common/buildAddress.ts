import { XMLBuilder } from 'fast-xml-parser';
import type { Address } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildAddress = (address: Address, keyName = 'address'): string =>
  builder.build({
    [keyName]: {
      '@_type': address.type,
      address: address.address,
      city: address.city,
      zipCode: address.zipCode,
      state: address.state,
      nonUsaState: address.nonUsaState,
      country: address.country,
    },
  });
