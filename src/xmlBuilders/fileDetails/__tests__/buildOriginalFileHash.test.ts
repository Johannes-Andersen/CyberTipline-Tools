import { describe, it } from 'node:test';
import { FileHashType, type OriginalFileHash } from '../../../types';
import { buildOriginalFileHash } from '../buildOriginalFileHash';

describe('buildOriginalFileHash', () => {
  it('should build a device ID', ({ assert }) => {
    const originalFileHash: OriginalFileHash = {
      hashType: FileHashType.MD5,
      value: '1234567890',
    };

    const result = buildOriginalFileHash(originalFileHash);

    assert.snapshot(result);
  });
});
