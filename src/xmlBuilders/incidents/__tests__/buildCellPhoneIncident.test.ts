import { describe, it } from 'node:test';
import type { CellPhoneIncident } from '../../../types';
import { buildCellPhoneIncident } from '../buildCellPhoneIncident';

describe('buildCellPhoneIncident', () => {
  it('should build a cell phone incident', ({ assert }) => {
    const cellPhoneIncident: CellPhoneIncident = {
      additionalInfo: 'additional info',
      phoneNumber: {
        verified: true,
        number: '1234567890',
      },
      longitude: 456,
      latitude: 123,
    };

    const result = buildCellPhoneIncident(cellPhoneIncident);

    assert.snapshot(result);
  });

  it('should build a cell phone incident with no numbers values', ({
    assert,
  }) => {
    const cellPhoneIncident: CellPhoneIncident = {
      latitude: 123,
      additionalInfo: 'additional info',
      longitude: 456,
    };

    const result = buildCellPhoneIncident(cellPhoneIncident);

    assert.snapshot(result);
  });
});
