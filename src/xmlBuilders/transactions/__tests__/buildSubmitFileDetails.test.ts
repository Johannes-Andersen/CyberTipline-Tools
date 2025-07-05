import { describe, it } from 'node:test';
import type { SubmitFileDetails } from '../../../types';
import {
  DeviceEventName,
  DeviceIdType,
  FileAnnotations,
  FileDetailType,
  FileHashType,
  FileRelevance,
  IndustryClassification,
  IPEventName,
} from '../../../types';
import { buildSubmitFileDetails } from '../buildSubmitFileDetails';

describe('buildSubmitFileDetails', () => {
  it('should build file details with all fields', ({ assert }) => {
    const fileDetails: SubmitFileDetails = {
      reportId: 123456,
      fileId: 'FILE789',
      fileName: 'stored_evidence.jpg',
      originalFileName: 'original_evidence.jpg',
      locationOfFile: 'https://platform.com/files/evidence.jpg',
      fileViewedByEsp: true,
      exifViewedByEsp: true,
      publiclyAvailable: false,
      fileRelevance: FileRelevance.Reported,
      fileAnnotations: {
        [FileAnnotations.Viral]: true,
        [FileAnnotations.LiveStreaming]: true,
        [FileAnnotations.GenerativeAI]: false,
      },
      industryClassification: IndustryClassification.A1,
      originalFileHash: [
        {
          value:
            '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
          hashType: FileHashType.SHA1,
        },
        {
          value: 'e86fdc2283aff4179685f2a918a769eb',
          hashType: FileHashType.MD5,
        },
      ],
      ipCaptureEvent: {
        ipAddress: '192.168.5.100',
        eventName: IPEventName.Upload,
        dateTime: new Date('2024-01-15T16:30:00Z'),
        possibleProxy: false,
        port: 443,
      },
      deviceId: [
        {
          idType: DeviceIdType.IMEI,
          idValue: '354123456789012',
          eventName: DeviceEventName.Upload,
          dateTime: new Date('2024-01-15T16:30:00Z'),
        },
      ],
      details: [
        {
          type: FileDetailType.EXIF,
          valuePair: [
            {
              name: 'Make',
              value: 'Canon',
            },
            {
              name: 'Model',
              value: 'EOS R5',
            },
          ],
        },
        {
          type: FileDetailType.HASH,
          valuePair: [
            {
              name: 'PhotoDNA',
              value: 'hash_value_1',
            },
          ],
        },
      ],
      additionalInfo: [
        'File was uploaded via mobile app',
        'User attempted to delete file after upload',
      ],
    };

    const result = buildSubmitFileDetails(fileDetails);

    assert.snapshot(result);
  });

  it('should build file details with only required fields', ({ assert }) => {
    const fileDetails: SubmitFileDetails = {
      reportId: 123456,
      fileId: 'FILE789',
    };

    const result = buildSubmitFileDetails(fileDetails);

    assert.snapshot(result);
  });

  it('should build file details with file annotations and relevance', ({
    assert,
  }) => {
    const fileDetails: SubmitFileDetails = {
      reportId: 123456,
      fileId: 'FILE789',
      fileRelevance: FileRelevance.SupplementalReported,
      fileAnnotations: {
        [FileAnnotations.PotentialMeme]: true,
        [FileAnnotations.Viral]: true,
      },
      additionalInfo: ['File appears to be a viral meme'],
    };

    const result = buildSubmitFileDetails(fileDetails);

    assert.snapshot(result);
  });

  it('should build file details with technical metadata', ({ assert }) => {
    const fileDetails: SubmitFileDetails = {
      reportId: 123456,
      fileId: 'FILE789',
      fileViewedByEsp: true,
      exifViewedByEsp: true,
      details: [
        {
          type: FileDetailType.EXIF,
          valuePair: [
            {
              name: 'DateTime',
              value: '2024:01:15 16:30:00',
            },
            {
              name: 'GPSLatitude',
              value: '40.7128° N',
            },
            {
              name: 'GPSLongitude',
              value: '74.0060° W',
            },
          ],
        },
      ],
      deviceId: [
        {
          idType: DeviceIdType.ICCID,
          idValue: '89012345678901234567',
          eventName: DeviceEventName.Upload,
        },
      ],
    };

    const result = buildSubmitFileDetails(fileDetails);

    assert.snapshot(result);
  });
});
