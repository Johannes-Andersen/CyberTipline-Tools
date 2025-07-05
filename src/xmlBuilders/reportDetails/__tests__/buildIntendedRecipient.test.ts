import { describe, it } from 'node:test';
import type { IntendedRecipient } from '../../../types';
import {
  Country,
  DeviceEventName,
  DeviceIdType,
  IPEventName,
  State,
} from '../../../types';
import { buildIntendedRecipient } from '../buildIntendedRecipient';

describe('buildIntendedRecipient', () => {
  it('should build an intended recipient with all fields', ({ assert }) => {
    const intendedRecipient: IntendedRecipient = {
      intendedRecipientPerson: {
        firstName: 'Thomas',
        lastName: 'Anderson',
        age: 28,
        dateOfBirth: new Date('1996-02-10'),
        phone: [
          {
            number: '555-4444',
            verified: true,
          },
        ],
        email: [
          {
            email: 'thomas.anderson@email.com',
            verified: true,
          },
        ],
        address: [
          {
            address: '456 Tech Street',
            city: 'Chicago',
            state: State.Illinois,
            zipCode: '234',
          },
        ],
      },
      espIdentifier: 'USER654321',
      espService: 'Gaming Platform Alpha',
      screenName: 'neo_matrix',
      displayName: ['Neo', 'The One'],
      profileUrl: ['https://gaming-alpha.com/neo_matrix'],
      ipCaptureEvent: [
        {
          ipAddress: '192.168.4.100',
          eventName: IPEventName.Login,
          dateTime: new Date('2024-01-15T15:30:00Z'),
          possibleProxy: false,
        },
      ],
      deviceId: [
        {
          idType: DeviceIdType.IMEI,
          idValue: '123456789054321',
          eventName: DeviceEventName.Login,
          dateTime: new Date('2024-01-15T15:30:00Z'),
        },
      ],
      priorCTReports: [987654],
      groupIdentifier: 'Matrix Gamers',
      accountTemporarilyDisabled: {
        disabledDate: new Date('2024-01-10T00:00:00Z'),
        reenabledDate: new Date('2024-01-12T00:00:00Z'),
      },
      estimatedLocation: {
        city: 'Chicago',
        region: 'Illinois',
        countryCode: Country.UnitedStates,
        verified: true,
        timestamp: new Date('2024-01-15T16:00:00Z'),
      },
      additionalInfo:
        'User has multiple accounts across different gaming platforms',
    };

    const result = buildIntendedRecipient(intendedRecipient);

    assert.snapshot(result);
  });

  it('should build an intended recipient with minimal online presence', ({
    assert,
  }) => {
    const intendedRecipient: IntendedRecipient = {
      screenName: 'unknown_gamer',
      ipCaptureEvent: [
        {
          ipAddress: '192.168.4.200',
          eventName: IPEventName.Login,
        },
      ],
      accountPermanentlyDisabled: true,
    };

    const result = buildIntendedRecipient(intendedRecipient);

    assert.snapshot(result);
  });

  it('should build an intended recipient with person details and account status', ({
    assert,
  }) => {
    const intendedRecipient: IntendedRecipient = {
      intendedRecipientPerson: {
        firstName: 'Mark',
        lastName: 'Williams',
        age: 25,
      },
      screenName: 'mark_gaming',
      accountTemporarilyDisabled: true,
      accountPermanentlyDisabled: {
        disabledDate: new Date('2024-01-15T00:00:00Z'),
      },
      additionalInfo: 'Account disabled due to multiple violations',
    };

    const result = buildIntendedRecipient(intendedRecipient);

    assert.snapshot(result);
  });

  it('should build an intended recipient with multiple devices and group info', ({
    assert,
  }) => {
    const intendedRecipient: IntendedRecipient = {
      espIdentifier: 'GAMER123',
      espService: 'Multi-Gaming Network',
      screenName: 'pro_gamer',
      deviceId: [
        {
          idType: DeviceIdType.IMEI,
          idValue: '555666777888999',
          eventName: DeviceEventName.Login,
        },
        {
          idType: DeviceIdType.ICCID,
          idValue: '11122233344455566677',
          eventName: DeviceEventName.Registration,
        },
      ],
      groupIdentifier: 'Pro Gamers Alliance',
      priorCTReports: [111222, 333444],
      estimatedLocation: {
        city: 'New York',
        region: 'New York',
        countryCode: Country.UnitedStates,
        verified: false,
      },
    };

    const result = buildIntendedRecipient(intendedRecipient);

    assert.snapshot(result);
  });
});
