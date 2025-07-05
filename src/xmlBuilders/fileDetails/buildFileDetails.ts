import { XMLBuilder } from 'fast-xml-parser';
import type { FileDetails } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildFileDetails = (
  fileDetails: FileDetails,
  keyName = 'details',
): string => {
  return builder.build({
    [keyName]: {
      '@_type': fileDetails.type,
      nameValuePair: fileDetails.valuePair.map(({ name, value }) => ({
        name,
        value,
      })),
    },
  });
};
