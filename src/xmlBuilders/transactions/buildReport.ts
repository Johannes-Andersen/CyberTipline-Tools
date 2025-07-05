import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { Report } from '../../types';
import { buildCellPhoneIncident } from '../incidents/buildCellPhoneIncident';
import { buildChatImIncident } from '../incidents/buildChatImIncident';
import { buildEmailIncident } from '../incidents/buildEmailIncident';
import { buildNewsgroupIncident } from '../incidents/buildNewsgroupIncident';
import { buildOnlineGamingIncident } from '../incidents/buildOnlineGamingIncident';
import { buildWebPageIncident } from '../incidents/buildWebPageIncident';
import { buildIncidentSummary } from '../reportDetails/buildIncidentSummary';
import { buildIntendedRecipient } from '../reportDetails/buildIntendedRecipient';
import { buildLawEnforcement } from '../reportDetails/buildLawEnforcement';
import { buildPersonOrUserReported } from '../reportDetails/buildPersonOrUserReported';
import { buildReporter } from '../reportDetails/buildReporter';
import { buildVictim } from '../reportDetails/buildVictim';

const parser = new XMLParser({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
  suppressEmptyNode: true,
  processEntities: false,
});

export const buildReport = (report: Report, keyName = 'report'): string => {
  const {
    victim,
    intendedRecipient,
    personOrUserReported,
    reporter,
    lawEnforcement,
    incidentDetails,
    incidentSummary,
    additionalInfo,
  } = report;

  const victims = victim?.map((e) => parser.parse(buildVictim(e)).victim);
  const intendedRecipients = intendedRecipient?.map(
    (e) => parser.parse(buildIntendedRecipient(e)).intendedRecipient,
  );
  const reportedPerson = personOrUserReported
    ? parser.parse(buildPersonOrUserReported(personOrUserReported))
        .personOrUserReported
    : undefined;
  const reportingPerson = parser.parse(buildReporter(reporter)).reporter;
  const lawEnforcementEntity = lawEnforcement
    ? parser.parse(buildLawEnforcement(lawEnforcement)).lawEnforcement
    : undefined;
  const incidentSummaryEntity = parser.parse(
    buildIncidentSummary(incidentSummary),
  ).incidentSummary;

  const {
    webPageIncidents,
    emailIncidents,
    newsgroupIncidents,
    chatImIncidents,
    onlineGamingIncidents,
    cellPhoneIncidents,
  } = incidentDetails ?? {};

  const internetDetailsEntities = [
    webPageIncidents?.map((e) => parser.parse(buildWebPageIncident(e))),
    emailIncidents?.map((e) => parser.parse(buildEmailIncident(e))),
    newsgroupIncidents?.map((e) => parser.parse(buildNewsgroupIncident(e))),
    chatImIncidents?.map((e) => parser.parse(buildChatImIncident(e))),
    onlineGamingIncidents?.map((e) =>
      parser.parse(buildOnlineGamingIncident(e)),
    ),
    cellPhoneIncidents?.map((e) => parser.parse(buildCellPhoneIncident(e))),
  ];

  const xmlObj = {
    '?xml': {
      '@_version': '1.0',
      '@_encoding': 'UTF-8',
    },
    [keyName]: {
      '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@_xsi:noNamespaceSchemaLocation':
        'https://report.cybertip.org/ispws/xsd',
      incidentSummary: incidentSummaryEntity,
      internetDetails: internetDetailsEntities.flat(),
      lawEnforcement: lawEnforcementEntity,
      reporter: reportingPerson,
      personOrUserReported: reportedPerson,
      intendedRecipient: intendedRecipients,
      victim: victims,
      additionalInfo,
    },
  };

  return builder.build(xmlObj);
};
