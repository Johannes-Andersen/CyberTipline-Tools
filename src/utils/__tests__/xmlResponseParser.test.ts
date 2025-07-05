import { describe, it } from 'node:test';
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
  it('should parse valid XML with required fields', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</responseCode>
        <message>Success</message>
      </response>
    `;

    const result = parseXmlResponse<TestResponse>(xml, validConfig);

    assert.deepEqual(result, {
      responseCode: 0,
      message: 'Success',
    });
  });

  it('should parse valid XML with optional fields', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</responseCode>
        <message>Success</message>
        <optionalField>Extra info</optionalField>
      </response>
    `;

    const result = parseXmlResponse<TestResponse>(xml, validConfig);

    assert.deepEqual(result, {
      responseCode: 0,
      message: 'Success',
      optionalField: 'Extra info',
    });
  });

  it('should throw error for malformed XML', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</
        <message>Success</message>
      </response>
    `;

    assert.throws(() => parseXmlResponse<TestResponse>(xml, validConfig));
  });

  it('should throw error for missing root key', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <wrongRoot>
        <responseCode>0</responseCode>
        <message>Success</message>
      </wrongRoot>
    `;

    assert.throws(() => parseXmlResponse<TestResponse>(xml, validConfig), {
      message: 'XML response missing required "response" property',
    });
  });

  it('should throw error for missing required field', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>0</responseCode>
      </response>
    `;

    assert.throws(() => parseXmlResponse<TestResponse>(xml, validConfig), {
      message: 'Response missing required "message" property',
    });
  });

  it('should throw error for wrong field type', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>
        <responseCode>not a number</responseCode>
        <message>Success</message>
      </response>
    `;

    assert.throws(() => parseXmlResponse<TestResponse>(xml, validConfig), {
      message: 'Response "responseCode" must be a number, got: string',
    });
  });

  it('should throw error for non-object root value', ({ assert }) => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <response>Just a string</response>
    `;

    assert.throws(() => parseXmlResponse<TestResponse>(xml, validConfig), {
      message: 'XML "response" must be an object, got: string',
    });
  });

  it('should handle empty XML response', ({ assert }) => {
    const xml = '';

    assert.throws(() => parseXmlResponse<TestResponse>(xml, validConfig), {
      message: 'XML response missing required "response" property',
    });
  });

  it('should handle XML with whitespace and newlines', ({ assert }) => {
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

    assert.deepEqual(result, {
      responseCode: 0,
      message: 'Success',
    });
  });

  it('should validate multiple fields with different types', ({ assert }) => {
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

    assert.deepEqual(result, {
      id: 123,
      name: 'Test Item',
      description: 'A test item',
    });
  });
});
