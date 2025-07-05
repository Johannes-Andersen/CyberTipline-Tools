import { XMLParser } from 'fast-xml-parser';

export type ValidationRule<T> = {
  key: keyof T;
  type: 'string' | 'number';
  required: boolean;
};

export type ValidationConfig<T> = {
  rootKey: string;
  rules: Array<ValidationRule<T>>;
};

const parser = new XMLParser();

const isExpectedType = (
  value: unknown,
  expectedType: 'string' | 'number',
): boolean => {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    default:
      return false;
  }
};

/**
 * Generic XML response parser that validates and transforms XML responses based on configuration
 *
 * @param xmlData - Raw XML response string from the API
 * @param config - Validation configuration specifying required fields and their types
 * @returns Parsed response object of type T
 * @throws Error if the XML is malformed or validation fails
 */
export function parseXmlResponse<T extends object>(
  xmlData: string,
  config: ValidationConfig<T>,
): T {
  // Parse XML string into a JavaScript object with string indexing
  const json = parser.parse(xmlData) as Record<string, unknown>;

  // Validate root is an object
  if (typeof json !== 'object' || json === null) {
    throw new Error(`XML response must be an object, got: ${typeof json}`);
  }

  // Validate root key exists
  if (!(config.rootKey in json)) {
    throw new Error(
      `XML response missing required "${config.rootKey}" property`,
    );
  }

  const rootValue = json[config.rootKey];

  // Validate root value is an object
  if (typeof rootValue !== 'object' || rootValue === null) {
    throw new Error(
      `XML "${config.rootKey}" must be an object, got: ${typeof rootValue}`,
    );
  }

  const response = rootValue as Record<string, unknown>;

  // Apply validation rules
  for (const rule of config.rules) {
    const { key, type, required } = rule;
    const stringKey = String(key);

    // Skip validation if field is optional and not present
    if (!required && !(stringKey in response)) {
      continue;
    }

    // Validate required fields exist
    if (required && !(stringKey in response)) {
      throw new Error(`Response missing required "${stringKey}" property`);
    }

    // Validate field type if present
    if (stringKey in response && !isExpectedType(response[stringKey], type)) {
      throw new Error(
        `Response "${stringKey}" must be a ${type}, got: ${typeof response[stringKey]}`,
      );
    }
  }

  return response as T;
}
