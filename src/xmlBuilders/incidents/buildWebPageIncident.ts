import { XMLBuilder } from 'fast-xml-parser';
import type { WebPageIncident } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildWebPageIncident = (
  webPageIncident: WebPageIncident,
  keyName = 'webPageIncident',
): string =>
  builder.build({
    [keyName]: {
      url: webPageIncident.url,
      additionalInfo: webPageIncident.additionalInfo,
      '@_thirdPartyHostedContent': webPageIncident.thirdPartyHostedContent,
    },
  });
