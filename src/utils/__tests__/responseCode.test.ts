import { describe, it } from 'node:test';
import {
  ensureDesiredReportState,
  ensureSuccessResponse,
  resolveResponseCode,
} from '../responseCode';

// Mock the ResponseCode enum since we can't import it directly in the test environment
const MockResponseCode = {
  Success: 0,
  ServerError: 1000,
  ReportAlreadyFinished: 5102,
  ReportAlreadyRetracted: 5101,
} as const;

describe('resolveResponseCode', () => {
  it('should resolve success code correctly', ({ assert }) => {
    const result = resolveResponseCode(MockResponseCode.Success);

    assert.deepEqual(result, {
      message: 'Success',
      httpStatus: 200,
    });
  });

  it('should resolve error codes correctly', ({ assert }) => {
    const result = resolveResponseCode(MockResponseCode.ServerError);
    assert.deepEqual(result, {
      message: 'Server error',
      httpStatus: 500,
    });
  });

  it('should handle unknown response codes', ({ assert }) => {
    const result = resolveResponseCode(99999);
    assert.deepEqual(result, {
      message: 'Unknown error',
      httpStatus: 500,
    });
  });
});

describe('ensureSuccessResponse', () => {
  it('should not throw for success response', ({ assert }) => {
    assert.doesNotThrow(() => {
      ensureSuccessResponse(MockResponseCode.Success);
    });
  });

  it('should throw for non-success response', ({ assert }) => {
    assert.throws(
      () => {
        ensureSuccessResponse(MockResponseCode.ServerError);
      },
      {
        message: 'Server error',
        name: 'Error',
      },
    );
  });

  it('should throw with correct message for unknown code', ({ assert }) => {
    assert.throws(
      () => {
        ensureSuccessResponse(99999);
      },
      {
        message: 'Unknown error',
        name: 'Error',
      },
    );
  });
});

describe('ensureDesiredReportState', () => {
  it('should not throw for success response', ({ assert }) => {
    assert.doesNotThrow(() => {
      ensureDesiredReportState(MockResponseCode.Success);
    });
  });

  it('should not throw for already finished report', ({ assert }) => {
    assert.doesNotThrow(() => {
      ensureDesiredReportState(MockResponseCode.ReportAlreadyFinished);
    });
  });

  it('should not throw for already retracted report', ({ assert }) => {
    assert.doesNotThrow(() => {
      ensureDesiredReportState(MockResponseCode.ReportAlreadyRetracted);
    });
  });

  it('should throw for other error responses', ({ assert }) => {
    assert.throws(
      () => {
        ensureDesiredReportState(MockResponseCode.ServerError);
      },
      {
        message: 'Server error',
        name: 'Error',
      },
    );
  });

  it('should throw with correct message for unknown code', ({ assert }) => {
    assert.throws(
      () => {
        ensureDesiredReportState(99999);
      },
      {
        message: 'Unknown error',
        name: 'Error',
      },
    );
  });
});
