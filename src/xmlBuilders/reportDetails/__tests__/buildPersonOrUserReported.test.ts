import { describe, it } from 'node:test';
import type { PersonOrUserReported } from '../../../types';
import {
  Country,
  DeviceEventName,
  DeviceIdType,
  IPEventName,
  State,
} from '../../../types';
import { buildPersonOrUserReported } from '../buildPersonOrUserReported';

describe('buildPersonOrUserReported', () => {
  it('should build a person or user reported with all fields', ({ assert }) => {
    const personOrUserReported: PersonOrUserReported = {
      personOrUserReportedPerson: {
        firstName: 'James',
        lastName: 'Wilson',
        age: 35,
        dateOfBirth: new Date('1989-03-15'),
        phone: [
          {
            number: '555-0123',
            verified: true,
          },
        ],
        email: [
          {
            email: 'jwilson@example.com',
            verified: true,
          },
        ],
        address: [
          {
            address: '123 Main St',
            city: 'Springfield',
            state: State.Connecticut,
            zipCode: '62701',
          },
        ],
      },
      vehicleDescription: 'Red Toyota Camry, License Plate ABC-123',
      espIdentifier: 'USER123456',
      espService: 'Social Media Platform X',
      screenName: 'jwilson_1989',
      displayName: ['James W.', 'JW'],
      profileUrl: ['https://platform-x.com/jwilson_1989'],
      ipCaptureEvent: [
        {
          ipAddress: '192.168.1.100',
          eventName: IPEventName.Login,
          dateTime: new Date('2024-01-15T10:30:00Z'),
          possibleProxy: false,
          port: 443,
        },
        {
          ipAddress: '10.0.0.50',
          eventName: IPEventName.Upload,
          dateTime: new Date('2024-01-15T11:45:00Z'),
          possibleProxy: true,
        },
      ],
      deviceId: [
        {
          idType: DeviceIdType.IMEI,
          idValue: '123456789012345',
          eventName: DeviceEventName.Login,
          dateTime: new Date('2024-01-15T10:30:00Z'),
        },
      ],
      thirdPartyUserReported: false,
      priorCTReports: [123456, 789012],
      groupIdentifier: 'Group XYZ',
      estimatedLocation: {
        city: 'Springfield',
        region: 'Illinois',
        countryCode: Country.UnitedStates,
        verified: true,
        timestamp: new Date('2024-01-15T12:00:00Z'),
      },
      additionalInfo:
        'Subject frequently changes usernames and uses multiple devices',
    };

    const result = buildPersonOrUserReported(personOrUserReported);

    assert.snapshot(result);
  });

  it('should build a person or user reported with minimal online presence', ({
    assert,
  }) => {
    const personOrUserReported: PersonOrUserReported = {
      screenName: 'anonymous_user',
      ipCaptureEvent: [
        {
          ipAddress: '192.168.1.200',
          eventName: IPEventName.Upload,
        },
      ],
      thirdPartyUserReported: true,
    };

    const result = buildPersonOrUserReported(personOrUserReported);

    assert.snapshot(result);
  });

  it('should build a person or user reported with only physical details', ({
    assert,
  }) => {
    const personOrUserReported: PersonOrUserReported = {
      personOrUserReportedPerson: {
        firstName: 'Robert',
        lastName: 'Brown',
        age: 42,
        address: [
          {
            address: '456 Oak Street',
            city: 'Chicago',
            state: State.Illinois,
          },
        ],
      },
      vehicleDescription: 'Blue Ford F-150',
      estimatedLocation: {
        city: 'Chicago',
        region: 'Illinois',
        countryCode: Country.UnitedStates,
      },
    };

    const result = buildPersonOrUserReported(personOrUserReported);

    assert.snapshot(result);
  });

  it('should build a person or user reported with multiple devices and IPs', ({
    assert,
  }) => {
    const personOrUserReported: PersonOrUserReported = {
      screenName: 'tech_user',
      deviceId: [
        {
          idType: DeviceIdType.IMEI,
          idValue: '987654321098765',
          eventName: DeviceEventName.Login,
        },
        {
          idType: DeviceIdType.ICCID,
          idValue: '12345678901234567890',
          eventName: DeviceEventName.Registration,
        },
      ],
      ipCaptureEvent: [
        {
          ipAddress: '172.16.0.100',
          eventName: IPEventName.Login,
          possibleProxy: false,
        },
        {
          ipAddress: '172.16.0.200',
          eventName: IPEventName.Upload,
          possibleProxy: true,
        },
      ],
      priorCTReports: [111222],
      additionalInfo: 'Multiple devices used within short time spans',
    };

    const result = buildPersonOrUserReported(personOrUserReported);

    assert.snapshot(result);
  });
});
