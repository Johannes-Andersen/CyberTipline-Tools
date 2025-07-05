import { XMLBuilder } from 'fast-xml-parser';
import type { IncidentSummary } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildIncidentSummary = (
  incidentSummary: IncidentSummary,
  keyName = 'incidentSummary',
): string =>
  builder.build({
    [keyName]: {
      incidentType: incidentSummary.incidentType,
      escalateToHighPriority: incidentSummary.escalateToHighPriority,
      reportAnnotations: Object.fromEntries(
        Object.entries(incidentSummary.reportAnnotations ?? {})
          .filter(([_, value]) => value)
          .map(([key]) => [key, '']),
      ),
      incidentDateTime: incidentSummary.incidentDateTime.toISOString(),
      incidentDateTimeDescription: incidentSummary.incidentDateTimeDescription,
    },
  });
