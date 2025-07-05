import assert from 'node:assert';
import { describe, it } from 'node:test';
import {
  parseCancelResponse,
  parseFinishResponse,
  parseGetStatus,
  parseResponseError,
  parseSubmitFileDetailsResponse,
  parseSubmitResponse,
  parseUploadResponse,
} from '../responseParsers';

describe('responseParsers', () => {
  describe('parseFinishResponse', () => {
    it('should parse valid finish response XML', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportDoneResponse>
          <responseCode>0</responseCode>
          <reportId>4564654</reportId>
          <files>
            <fileId>b0754af766b426f2928a02c651ed4b99</fileId>
          </files>
        </reportDoneResponse>`;

      const result = parseFinishResponse(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.reportId, 4564654);
    });

    it('should throw error for missing responseCode', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportDoneResponse>
          <reportId>4564654</reportId>
        </reportDoneResponse>`;

      assert.throws(() => parseFinishResponse(xmlData), {
        message: 'Response missing required "responseCode" property',
      });
    });

    it('should throw error for missing reportId', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportDoneResponse>
          <responseCode>0</responseCode>
        </reportDoneResponse>`;

      assert.throws(() => parseFinishResponse(xmlData), {
        message: 'Response missing required "reportId" property',
      });
    });

    it('should throw error for invalid responseCode type', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportDoneResponse>
          <responseCode>invalid</responseCode>
          <reportId>4564654</reportId>
        </reportDoneResponse>`;

      assert.throws(() => parseFinishResponse(xmlData), {
        message: 'Response "responseCode" must be a number, got: string',
      });
    });

    it('should throw error for missing root element', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <wrongRoot>
          <responseCode>0</responseCode>
          <reportId>4564654</reportId>
        </wrongRoot>`;

      assert.throws(() => parseFinishResponse(xmlData), {
        message: 'XML response missing required "reportDoneResponse" property',
      });
    });
  });

  describe('parseGetStatus', () => {
    it('should parse valid get status response XML', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Remote User : testuser, Remote Ip : 192.168.1.1</responseDescription>
        </reportResponse>`;

      const result = parseGetStatus(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(
        result.responseDescription,
        'Remote User : testuser, Remote Ip : 192.168.1.1',
      );
    });

    it('should throw error for missing responseCode', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseDescription>Remote User : testuser, Remote Ip : 192.168.1.1</responseDescription>
        </reportResponse>`;

      assert.throws(() => parseGetStatus(xmlData), {
        message: 'Response missing required "responseCode" property',
      });
    });

    it('should throw error for missing responseDescription', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
        </reportResponse>`;

      assert.throws(() => parseGetStatus(xmlData), {
        message: 'Response missing required "responseDescription" property',
      });
    });

    it('should throw error for invalid responseDescription type', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>123</responseDescription>
        </reportResponse>`;

      assert.throws(() => parseGetStatus(xmlData), {
        message: 'Response "responseDescription" must be a string, got: number',
      });
    });
  });

  describe('parseResponseError', () => {
    it('should parse valid error response XML', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>1000</responseCode>
          <responseDescription>Server Error</responseDescription>
        </reportResponse>`;

      const result = parseResponseError(xmlData);

      assert.strictEqual(result.responseCode, 1000);
      assert.strictEqual(result.responseDescription, 'Server Error');
    });

    it('should throw error for malformed XML', () => {
      const xmlData = 'invalid xml';

      assert.throws(() => parseResponseError(xmlData));
    });

    it('should throw error for missing root element', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <wrongRoot>
          <responseCode>1000</responseCode>
          <responseDescription>Server Error</responseDescription>
        </wrongRoot>`;

      assert.throws(() => parseResponseError(xmlData), {
        message: 'XML response missing required "reportResponse" property',
      });
    });
  });

  describe('parseSubmitResponse', () => {
    it('should parse valid submit response XML', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
        </reportResponse>`;

      const result = parseSubmitResponse(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.responseDescription, 'Success');
      assert.strictEqual(result.reportId, 4564654);
    });

    it('should throw error for missing reportId', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
        </reportResponse>`;

      assert.throws(() => parseSubmitResponse(xmlData), {
        message: 'Response missing required "reportId" property',
      });
    });

    it('should throw error for invalid reportId type', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>invalid</reportId>
        </reportResponse>`;

      assert.throws(() => parseSubmitResponse(xmlData), {
        message: 'Response "reportId" must be a number, got: string',
      });
    });
  });

  describe('parseUploadResponse', () => {
    it('should parse valid upload response XML with hash', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
          <fileId>b0754af766b426f2928a02c651ed4b99</fileId>
          <hash>fafa5efeaf3cbe3b23b2748d13e629a1</hash>
        </reportResponse>`;

      const result = parseUploadResponse(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.responseDescription, 'Success');
      assert.strictEqual(result.reportId, 4564654);
      assert.strictEqual(result.fileId, 'b0754af766b426f2928a02c651ed4b99');
      assert.strictEqual(result.hash, 'fafa5efeaf3cbe3b23b2748d13e629a1');
    });

    it('should parse valid upload response XML without hash', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
          <fileId>b0754af766b426f2928a02c651ed4b99</fileId>
        </reportResponse>`;

      const result = parseUploadResponse(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.responseDescription, 'Success');
      assert.strictEqual(result.reportId, 4564654);
      assert.strictEqual(result.fileId, 'b0754af766b426f2928a02c651ed4b99');
      assert.strictEqual(result.hash, undefined);
    });

    it('should throw error for missing fileId', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
        </reportResponse>`;

      assert.throws(() => parseUploadResponse(xmlData), {
        message: 'Response missing required "fileId" property',
      });
    });

    it('should throw error for invalid fileId type', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
          <fileId>123</fileId>
        </reportResponse>`;

      assert.throws(() => parseUploadResponse(xmlData), {
        message: 'Response "fileId" must be a string, got: number',
      });
    });
  });

  describe('parseSubmitFileDetailsResponse', () => {
    it('should parse valid submit file details response XML', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
        </reportResponse>`;

      const result = parseSubmitFileDetailsResponse(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.responseDescription, 'Success');
      assert.strictEqual(result.reportId, 4564654);
    });

    it('should throw error for missing required fields', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
        </reportResponse>`;

      assert.throws(() => parseSubmitFileDetailsResponse(xmlData), {
        message: 'Response missing required "responseDescription" property',
      });
    });
  });

  describe('parseCancelResponse', () => {
    it('should parse valid cancel response XML', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
        </reportResponse>`;

      const result = parseCancelResponse(xmlData);

      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.responseDescription, 'Success');
      assert.strictEqual(result.reportId, 4564654);
    });

    it('should throw error for invalid XML structure', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
        </reportResponse>`;

      assert.throws(() => parseCancelResponse(xmlData), {
        message: 'Response missing required "reportId" property',
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty XML string', () => {
      const xmlData = '';

      assert.throws(() => parseGetStatus(xmlData));
    });

    it('should handle XML with only whitespace', () => {
      const xmlData = '   \n\t   ';

      assert.throws(() => parseGetStatus(xmlData));
    });

    it('should handle XML with null root', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse></reportResponse>`;

      assert.throws(() => parseGetStatus(xmlData), {
        message: 'XML "reportResponse" must be an object, got: string',
      });
    });

    it('should handle XML with mixed content types', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
          <someBoolean>true</someBoolean>
          <someObject>
            <nested>value</nested>
          </someObject>
        </reportResponse>`;

      // Should not throw for extra fields that aren't validated
      const result = parseSubmitResponse(xmlData);
      assert.strictEqual(result.responseCode, 0);
      assert.strictEqual(result.responseDescription, 'Success');
      assert.strictEqual(result.reportId, 4564654);
    });

    it('should handle XML with numeric strings correctly', () => {
      const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <reportResponse>
          <responseCode>0</responseCode>
          <responseDescription>Success</responseDescription>
          <reportId>4564654</reportId>
        </reportResponse>`;

      const result = parseSubmitResponse(xmlData);
      assert.strictEqual(typeof result.responseCode, 'number');
      assert.strictEqual(typeof result.reportId, 'number');
      assert.strictEqual(typeof result.responseDescription, 'string');
    });
  });
});
