import { describe, expect, it } from 'vitest';
import type { ValidationConfig } from '../xmlResponseParser';
import { parseXmlResponse } from '../xmlResponseParser';

type TestResponse = {
  responseCode: number;
  message: string;
  optionalField?: string;
};

const validConfig: ValidationConfig<TestResponse> = {
  rootKey: 'response',
  rules: [
    { key: 'responseCode', type: 'number', required: true },
    { key: 'message', type: 'string', required: true },
    { key: 'optionalField', type: 'string', required: false },
  ],
};

describe('parseXmlResponse', () => {
  it('should parse valid XML with required fields', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</responseCode>
        <message>Success</message>
      </response>
    `;

    const result = parseXmlResponse<TestResponse>(xml, validConfig);

    expect(result).toEqual({
      responseCode: 0,
      message: 'Success',
    });
  });

  it('should parse valid XML with optional fields', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</responseCode>
        <message>Success</message>
        <optionalField>Extra info</optionalField>
      </response>
    `;

    const result = parseXmlResponse<TestResponse>(xml, validConfig);

    expect(result).toEqual({
      responseCode: 0,
      message: 'Success',
      optionalField: 'Extra info',
    });
  });

  it('should throw error for malformed XML', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</
        <message>Success</message>
      </response>
    `;

    expect(() => parseXmlResponse<TestResponse>(xml, validConfig)).toThrow();
  });

  it('should throw error for missing root key', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <wrongRoot>
        <responseCode>0</responseCode>
        <message>Success</message>
      </wrongRoot>
    `;

    expect(() => parseXmlResponse<TestResponse>(xml, validConfig)).toThrow(
      'XML response missing required "response" property',
    );
  });

  it('should throw error for missing required field', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</responseCode>
      </response>
    `;

    expect(() => parseXmlResponse<TestResponse>(xml, validConfig)).toThrow(
      'Response missing required "message" property',
    );
  });

  it('should throw error for wrong field type', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>not a number</responseCode>
        <message>Success</message>
      </response>
    `;

    expect(() => parseXmlResponse<TestResponse>(xml, validConfig)).toThrow(
      'Response "responseCode" must be a number',
    );
  });

  it('should throw error for non-object root value', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>Just a string</response>
    `;

    expect(() => parseXmlResponse<TestResponse>(xml, validConfig)).toThrow(
      'XML "response" must be an object',
    );
  });

  it('should handle empty XML response', () => {
    const xml = '';

    expect(() => parseXmlResponse<TestResponse>(xml, validConfig)).toThrow();
  });

  it('should handle XML with whitespace and newlines', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        
        <responseCode>
          0
        </responseCode>
        
        <message>
          Success
        </message>
        
      </response>
    `;

    const result = parseXmlResponse<TestResponse>(xml, validConfig);

    expect(result).toEqual({
      responseCode: 0,
      message: 'Success',
    });
  });

  it('should validate multiple fields with different types', () => {
    type ComplexResponse = {
      id: number;
      name: string;
      description: string;
      optional?: string;
    };

    const complexConfig: ValidationConfig<ComplexResponse> = {
      rootKey: 'data',
      rules: [
        { key: 'id', type: 'number', required: true },
        { key: 'name', type: 'string', required: true },
        { key: 'description', type: 'string', required: true },
        { key: 'optional', type: 'string', required: false },
      ],
    };

    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <data>
        <id>123</id>
        <name>Test Item</name>
        <description>A test item</description>
      </data>
    `;

    const result = parseXmlResponse<ComplexResponse>(xml, complexConfig);

    expect(result).toEqual({
      id: 123,
      name: 'Test Item',
      description: 'A test item',
    });
  });
});
