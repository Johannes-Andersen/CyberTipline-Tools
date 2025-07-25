import { describe, it } from 'node:test';
import type { IncidentSummary } from '../../../types';
import { IncidentType, ReportAnnotation } from '../../../types';
import { buildIncidentSummary } from '../buildIncidentSummary';

describe('buildIncidentSummary', () => {
  it('should build an incident summary with all fields', ({ assert }) => {
    const incidentSummary: IncidentSummary = {
      incidentType: IncidentType.ChildPornography,
      escalateToHighPriority: 'Immediate risk to child',
      reportAnnotations: {
        [ReportAnnotation.Sextortion]: true,
        [ReportAnnotation.CsamSolicitation]: false,
        [ReportAnnotation.MinorToMinorInteraction]: true,
        [ReportAnnotation.Spam]: false,
      },
      incidentDateTime: new Date('2024-01-15T14:30:00Z'),
      incidentDateTimeDescription:
        'Incident occurred during after-school hours',
    };

    const result = buildIncidentSummary(incidentSummary);

    assert.snapshot(result);
  });

  it('should build an incident summary with only required fields', ({
    assert,
  }) => {
    const incidentSummary: IncidentSummary = {
      incidentType: IncidentType.OnlineEnticement,
      incidentDateTime: new Date('2024-01-16T09:15:00Z'),
    };

    const result = buildIncidentSummary(incidentSummary);

    assert.snapshot(result);
  });

  it('should build an incident summary with mixed report annotations', ({
    assert,
  }) => {
    const incidentSummary: IncidentSummary = {
      incidentType: IncidentType.ChildSexTrafficking,
      reportAnnotations: {
        [ReportAnnotation.Sextortion]: true,
        [ReportAnnotation.CsamSolicitation]: true,
      },
      incidentDateTime: new Date('2024-01-17T18:45:00Z'),
    };

    const result = buildIncidentSummary(incidentSummary);

    assert.snapshot(result);
  });

  it('should build an incident summary with high priority and no annotations', ({
    assert,
  }) => {
    const incidentSummary: IncidentSummary = {
      incidentType: IncidentType.ChildSexualMolestation,
      escalateToHighPriority: 'Multiple victims identified',
      incidentDateTime: new Date('2024-01-18T12:00:00Z'),
      incidentDateTimeDescription: 'Ongoing situation over several months',
    };

    const result = buildIncidentSummary(incidentSummary);

    assert.snapshot(result);
  });
});
