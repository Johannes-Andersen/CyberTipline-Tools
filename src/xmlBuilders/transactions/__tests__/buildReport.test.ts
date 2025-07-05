import { describe, it } from 'node:test';
import type { Report } from '../../../types';
import {
  Country,
  DeviceEventName,
  DeviceIdType,
  IncidentType,
  IPEventName,
  ReportAnnotation,
  State,
} from '../../../types';
import { buildReport } from '../buildReport';

describe('buildReport', () => {
  it('should build a report with all fields and multiple incident types', ({
    assert,
  }) => {
    const report: Report = {
      incidentSummary: {
        incidentType: IncidentType.ChildPornography,
        escalateToHighPriority: 'Immediate risk to child',
        reportAnnotations: {
          [ReportAnnotation.Sextortion]: true,
          [ReportAnnotation.CsamSolicitation]: true,
        },
        incidentDateTime: new Date('2024-01-15T14:30:00Z'),
        incidentDateTimeDescription: 'Multiple incidents over past week',
      },
      incidentDetails: {
        newsgroupIncidents: [
          {
            additionalInfo: 'Multiple incidents reported over the past week',
            content: 'Harmful content shared via newsgroup',
            name: 'newsgroup1',
          },
        ],
        webPageIncidents: [
          {
            url: ['https://example.com/harmful-content'],
            thirdPartyHostedContent: true,
            additionalInfo: 'Content reported by multiple users',
          },
        ],
        chatImIncidents: [
          {
            chatClient: 'SecureChat',
            chatRoomName: 'private-room-123',
            content: 'Suspicious messages exchanged',
            additionalInfo:
              'Room was created specifically for this interaction',
          },
        ],
        emailIncidents: [
          {
            emailAddress: [
              {
                email: 'suspicious@example.com',
                verified: true,
              },
            ],
            content: 'Harmful content shared via email',
            additionalInfo: 'Multiple emails sent from this address',
          },
        ],
      },
      lawEnforcement: {
        agencyName: 'FBI Cyber Division',
        caseNumber: 'FBI-2024-001',
        officerContact: {
          firstName: 'John',
          lastName: 'Smith',
          email: [
            {
              email: 'john.smith@fbi.gov',
              verified: true,
            },
          ],
        },
        reportedToLe: true,
        servedLegalProcessDomestic: true,
      },
      reporter: {
        reportingPerson: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: [
            {
              email: 'sarah.johnson@company.com',
              verified: true,
            },
          ],
          phone: [
            {
              number: '555-0123',
              verified: true,
            },
          ],
        },
        companyTemplate: 'Standard reporting template for Company XYZ',
        termsOfService: 'Users must comply with all applicable laws',
      },
      personOrUserReported: {
        personOrUserReportedPerson: {
          firstName: 'Unknown',
          lastName: 'User',
        },
        screenName: 'suspicious_user_123',
        ipCaptureEvent: [
          {
            ipAddress: '192.168.1.100',
            eventName: IPEventName.Upload,
            dateTime: new Date('2024-01-15T12:00:00Z'),
          },
        ],
        deviceId: [
          {
            idType: DeviceIdType.IMEI,
            idValue: '123456789012345',
            eventName: DeviceEventName.Login,
          },
        ],
      },
      intendedRecipient: [
        {
          screenName: 'victim_user',
          espIdentifier: 'USER123',
          estimatedLocation: {
            city: 'Springfield',
            region: 'Illinois',
            countryCode: Country.UnitedStates,
          },
        },
      ],
      victim: [
        {
          victimPerson: {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 15,
            address: [
              {
                address: '123 Main St',
                city: 'Springfield',
                state: State.Illinois,
                zipCode: '62701',
              },
            ],
          },
          schoolName: 'Springfield High School',
        },
      ],
      additionalInfo: 'Multiple incidents reported over the past week',
    };

    const result = buildReport(report);

    assert.snapshot(result);
  });

  it('should build a report with only required fields', ({ assert }) => {
    const report: Report = {
      incidentSummary: {
        incidentType: IncidentType.OnlineEnticement,
        incidentDateTime: new Date('2024-01-16T09:15:00Z'),
      },
      reporter: {
        reportingPerson: {
          firstName: 'John',
          lastName: 'Smith',
          email: [
            {
              email: 'john.smith@company.com',
              verified: true,
            },
          ],
        },
      },
    };

    const result = buildReport(report);

    assert.snapshot(result);
  });

  it('should build a report with multiple victims and recipients', ({
    assert,
  }) => {
    const report: Report = {
      incidentSummary: {
        incidentType: IncidentType.ChildSexTrafficking,
        incidentDateTime: new Date('2024-01-17T10:00:00Z'),
        escalateToHighPriority: 'Multiple victims identified',
      },
      reporter: {
        reportingPerson: {
          firstName: 'Emily',
          lastName: 'Davis',
          email: [
            {
              email: 'emily.davis@org.com',
              verified: true,
            },
          ],
        },
      },
      victim: [
        {
          victimPerson: {
            firstName: 'Victim',
            lastName: 'One',
            age: 14,
          },
          schoolName: 'Middle School A',
        },
        {
          victimPerson: {
            firstName: 'Victim',
            lastName: 'Two',
            age: 15,
          },
          schoolName: 'Middle School B',
        },
      ],
      intendedRecipient: [
        {
          screenName: 'user1',
          espIdentifier: 'USER456',
        },
        {
          screenName: 'user2',
          espIdentifier: 'USER789',
        },
      ],
    };

    const result = buildReport(report);

    assert.snapshot(result);
  });

  it('should build a report with mixed incident types and locations', ({
    assert,
  }) => {
    const report: Report = {
      incidentSummary: {
        incidentType: IncidentType.ChildPornography,
        incidentDateTime: new Date('2024-01-18T15:45:00Z'),
      },
      reporter: {
        reportingPerson: {
          firstName: 'Michael',
          lastName: 'Wilson',
          email: [
            {
              email: 'michael.wilson@company.com',
              verified: true,
            },
          ],
        },
      },
      incidentDetails: {
        webPageIncidents: [
          {
            url: [
              'https://platform1.com/content',
              'https://platform2.com/content',
            ],
            additionalInfo: 'Content found on multiple platforms',
          },
        ],
        onlineGamingIncidents: [
          {
            gameName: 'Virtual World',
            console: 'PC Gaming',
            content: 'Inappropriate messages in game chat',
          },
        ],
        cellPhoneIncidents: [
          {
            phoneNumber: {
              number: '555-0123',
              verified: true,
            },
            latitude: 40.7128,
            longitude: -74.006,
          },
        ],
      },
      personOrUserReported: {
        screenName: 'multi_platform_user',
        deviceId: [
          {
            idType: DeviceIdType.IMEI,
            idValue: '987654321098765',
            eventName: DeviceEventName.Login,
          },
        ],
        estimatedLocation: {
          city: 'New York',
          region: 'New York',
          countryCode: Country.UnitedStates,
          verified: true,
        },
      },
    };

    const result = buildReport(report);

    assert.snapshot(result);
  });
});
