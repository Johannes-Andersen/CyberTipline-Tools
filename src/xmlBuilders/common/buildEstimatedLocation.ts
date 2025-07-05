import { XMLBuilder } from 'fast-xml-parser';
import type { EstimatedLocation } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildEstimatedLocation = (
  location: EstimatedLocation,
  keyName = 'estimatedLocation',
): string =>
  builder.build({
    [keyName]: {
      '@_verified': location.verified,
      '@_timestamp': location.timestamp?.toISOString(),
      city: location.city,
      region: location.region,
      countryCode: location.countryCode,
    },
  });
