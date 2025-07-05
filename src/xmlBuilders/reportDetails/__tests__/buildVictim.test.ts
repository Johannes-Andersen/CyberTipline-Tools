import { describe, expect, it } from 'vitest';
import type { Victim } from '../../../types';
import {
  Country,
  DeviceEventName,
  DeviceIdType,
  IPEventName,
  State,
} from '../../../types';
import { buildVictim } from '../buildVictim';

describe('buildVictim', () => {
  it('should build a victim with all fields', () => {
    const victim: Victim = {
      victimPerson: {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 15,
        dateOfBirth: new Date('2009-05-20'),
        phone: [
          {
            number: '555-3333',
            verified: true,
          },
        ],
        email: [
          {
            email: 'jane.doe@email.com',
            verified: true,
          },
        ],
        address: [
          {
            address: '321 School Lane',
            city: 'Springfield',
            state: State.NewHampshire,
            zipCode: '234',
          },
        ],
      },
      espIdentifier: 'VICTIM789012',
      espService: 'Teen Social Network',
      screenName: 'jane_2009',
      displayName: ['Jane D.', 'JD'],
      profileUrl: ['https://teen-social.com/jane_2009'],
      ipCaptureEvent: [
        {
          ipAddress: '192.168.2.100',
          eventName: IPEventName.Login,
          dateTime: new Date('2024-01-15T13:30:00Z'),
          possibleProxy: false,
        },
      ],
      deviceId: [
        {
          idType: DeviceIdType.IMEI,
          idValue: '987654321012345',
          eventName: DeviceEventName.Login,
          dateTime: new Date('2024-01-15T13:30:00Z'),
        },
      ],
      schoolName: 'Springfield High School',
      priorCTReports: [654321],
      estimatedLocation: {
        city: 'Springfield',
        region: 'Illinois',
        countryCode: Country.UnitedStates,
        verified: true,
        timestamp: new Date('2024-01-15T14:00:00Z'),
      },
      additionalInfo: 'Victim has reported multiple incidents of harassment',
    };

    const result = buildVictim(victim);

    expect(result).toMatchSnapshot();
  });

  it('should build a victim with only required fields', () => {
    const victim: Victim = {
      victimPerson: {
        firstName: 'Alex',
        lastName: 'Smith',
        age: 14,
      },
    };

    const result = buildVictim(victim);

    expect(result).toMatchSnapshot();
  });

  it('should build a victim with online presence details', () => {
    const victim: Victim = {
      victimPerson: {
        firstName: 'Chris',
        lastName: 'Johnson',
        age: 16,
      },
      screenName: 'gamer_chris',
      displayName: ['CJ', 'Chris J.'],
      profileUrl: ['https://gaming-platform.com/gamer_chris'],
      ipCaptureEvent: [
        {
          ipAddress: '192.168.3.100',
          eventName: IPEventName.Login,
        },
        {
          ipAddress: '192.168.3.200',
          eventName: IPEventName.Upload,
        },
      ],
      schoolName: 'Central High School',
      additionalInfo: 'Active on multiple gaming platforms',
    };

    const result = buildVictim(victim);

    expect(result).toMatchSnapshot();
  });

  it('should build a victim with location and device details', () => {
    const victim: Victim = {
      victimPerson: {
        firstName: 'Emma',
        lastName: 'Wilson',
        age: 13,
        dateOfBirth: new Date('2011-08-15'),
      },
      deviceId: [
        {
          idType: DeviceIdType.ICCID,
          idValue: '98765432101234567890',
          eventName: DeviceEventName.Registration,
        },
      ],
      estimatedLocation: {
        city: 'Chicago',
        region: 'Illinois',
        countryCode: Country.UnitedStates,
        verified: false,
      },
      schoolName: 'Lincoln Middle School',
      priorCTReports: [112233],
    };

    const result = buildVictim(victim);

    expect(result).toMatchSnapshot();
  });
});
