import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { NonInternetIncident } from '../../types';
import { buildAddress } from '../common/buildAddress';

const parser = new XMLParser({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildNonInternetIncident = (
  nonInternetIncident: NonInternetIncident,
  keyName = 'nonInternetIncident',
): string =>
  builder.build({
    [keyName]: {
      locationName: nonInternetIncident.locationName,
      incidentAddress: nonInternetIncident.incidentAddress?.map(
        (e) => parser.parse(buildAddress(e)).address,
      ),
      additionalInfo: nonInternetIncident.additionalInfo,
    },
  });
