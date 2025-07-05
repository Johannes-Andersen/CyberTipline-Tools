import { describe, it } from 'node:test';
import { Country, type LawEnforcement } from '../../../types';
import { buildLawEnforcement } from '../buildLawEnforcement';

describe('buildLawEnforcement', () => {
  it('should build a law enforcement with all fields', ({ assert }) => {
    const lawEnforcement: LawEnforcement = {
      agencyName: 'FBI Cyber Division',
      caseNumber: 'FBI-2024-001',
      officerContact: {
        firstName: 'John',
        lastName: 'Smith',
      },
      reportedToLe: true,
      servedLegalProcessDomestic: true,
      servedLegalProcessInternational: {
        fleaCountry: Country.Canada,
      },
    };

    const result = buildLawEnforcement(lawEnforcement);

    assert.snapshot(result);
  });

  it('should build a law enforcement with minimal fields', ({ assert }) => {
    const lawEnforcement: LawEnforcement = {
      agencyName: 'Local Police Department',
      reportedToLe: false,
    };

    const result = buildLawEnforcement(lawEnforcement);

    assert.snapshot(result);
  });

  it('should build a law enforcement with boolean servedLegalProcessInternational', ({
    assert,
  }) => {
    const lawEnforcement: LawEnforcement = {
      agencyName: 'Interpol',
      caseNumber: 'INT-2024-002',
      reportedToLe: true,
      servedLegalProcessInternational: true,
    };

    const result = buildLawEnforcement(lawEnforcement);

    assert.snapshot(result);
  });

  it('should build a law enforcement with only officer contact', ({
    assert,
  }) => {
    const lawEnforcement: LawEnforcement = {
      agencyName: 'Local Police Department',
      officerContact: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: [
          {
            email: 'jane.doe@police.gov',
            verified: true,
          },
        ],
      },
      reportedToLe: true,
    };

    const result = buildLawEnforcement(lawEnforcement);

    assert.snapshot(result);
  });
});
