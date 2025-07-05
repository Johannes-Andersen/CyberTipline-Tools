import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { Reporter } from '../../types';
import { buildContactPerson, buildPerson } from '../common/buildPerson';

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

export const buildReporter = (
  reporter: Reporter,
  keyName = 'reporter',
): string => {
  const { reportingPerson, contactPerson } = reporter;

  const person = parser.parse(buildPerson(reportingPerson)).person;
  const contact = contactPerson
    ? parser.parse(buildContactPerson(contactPerson)).contactPerson
    : undefined;

  return builder.build({
    [keyName]: {
      reportingPerson: person,
      contactPerson: contact,
      companyTemplate: reporter.companyTemplate,
      termsOfService: reporter.termsOfService,
      legalURL: reporter.legalUrl,
    },
  });
};
