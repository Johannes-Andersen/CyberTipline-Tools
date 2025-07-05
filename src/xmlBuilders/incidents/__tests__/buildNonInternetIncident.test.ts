import { describe, it } from 'node:test';
import { AddressType, type NonInternetIncident, State } from '../../../types';
import { buildNonInternetIncident } from '../buildNonInternetIncident';

describe('buildNonInternetIncident', () => {
  it('should build a non internet incident', ({ assert }) => {
    const nonInternetIncident: NonInternetIncident = {
      incidentAddress: [
        {
          address: '123 Main St',
          city: 'Anytown',
          state: State.Florida,
        },
        {
          address: '456 Elm St',
          city: 'Othertown',
          state: State.Alabama,
          type: AddressType.Billing,
        },
      ],
      locationName: 'My House',
      additionalInfo: 'This is a test',
    };

    const result = buildNonInternetIncident(nonInternetIncident);

    assert.snapshot(result);
  });
});
