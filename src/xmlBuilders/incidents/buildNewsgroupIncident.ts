import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { NewsgroupIncident } from '../../types';
import { buildEmail } from '../common/buildEmail';

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

export const buildNewsgroupIncident = (
  newsgroupIncident: NewsgroupIncident,
  keyName = 'newsgroupIncident',
): string =>
  builder.build({
    [keyName]: {
      name: newsgroupIncident.name,
      emailAddress: newsgroupIncident.emailAddress?.map(
        (e) => parser.parse(buildEmail(e)).email,
      ),
      content: newsgroupIncident.content,
      additionalInfo: newsgroupIncident.additionalInfo,
    },
  });
