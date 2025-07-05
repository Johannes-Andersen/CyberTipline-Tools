import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { LawEnforcement } from '../../types';
import { buildContactPerson } from '../common/buildPerson';

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

export const buildLawEnforcement = (
  lawEnforcement: LawEnforcement,
  keyName = 'lawEnforcement',
): string => {
  const { officerContact, servedLegalProcessInternational } = lawEnforcement;

  const person = officerContact
    ? parser.parse(buildContactPerson(officerContact, 'officerContact'))
        .officerContact
    : undefined;

  return builder.build({
    [keyName]: {
      agencyName: lawEnforcement.agencyName,
      caseNumber: lawEnforcement.caseNumber,
      officerContact: person,
      reportedToLe: lawEnforcement.reportedToLe,
      servedLegalProcessDomestic: lawEnforcement.servedLegalProcessDomestic,
      servedLegalProcessInternational: servedLegalProcessInternational
        ? {
            '#text': !!servedLegalProcessInternational,
            '@_fleaCountry':
              typeof servedLegalProcessInternational === 'object'
                ? servedLegalProcessInternational.fleaCountry
                : undefined,
          }
        : undefined,
    },
  });
};
