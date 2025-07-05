import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { EmailIncident } from '../../types';
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

export const buildEmailIncident = (
  emailIncident: EmailIncident,
  keyName = 'emailIncident',
): string =>
  builder.build({
    [keyName]: {
      emailAddress: emailIncident.emailAddress?.map(
        (e) => parser.parse(buildEmail(e)).email,
      ),
      content: emailIncident.content,
      additionalInfo: emailIncident.additionalInfo,
    },
  });
