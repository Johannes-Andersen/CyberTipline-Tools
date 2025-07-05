import { describe, it } from 'node:test';
import { type FileDetails, FileDetailType } from '../../../types';
import { buildFileDetails } from '../buildFileDetails';

describe('buildFileDetails', () => {
  it('should build file details', ({ assert }) => {
    const fileDetails: FileDetails = {
      type: FileDetailType.EXIF,
      valuePair: [
        {
          name: 'name',
          value: 'value',
        },
        {
          value: 'value2',
          name: 'name2',
        },
      ],
    };

    const result = buildFileDetails(fileDetails);

    assert.snapshot(result);
  });
});
