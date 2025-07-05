import { XMLBuilder } from 'fast-xml-parser';
import type { OriginalFileHash } from '../../types';

const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  suppressBooleanAttributes: false,
});

export const buildOriginalFileHash = (
  originalFileHash: OriginalFileHash,
  keyName = 'originalFileHash',
): string =>
  builder.build({
    [keyName]: {
      '@_hashType': originalFileHash.hashType,
      '#text': originalFileHash.value,
    },
  });
