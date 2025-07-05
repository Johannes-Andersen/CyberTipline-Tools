import { describe, it } from 'node:test';
import { type Reporter, State } from '../../../types';
import { buildReporter } from '../buildReporter';

describe('buildReporter', () => {
  it('should build a reporter with all fields', ({ assert }) => {
    const reporter: Reporter = {
      reportingPerson: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: [
          {
            email: 'sarah.johnson@company.com',
            verified: true,
          },
        ],
        phone: [
          {
            number: '555-9876',
            verified: true,
          },
        ],
        address: [
          {
            address: '789 Corporate Drive',
            city: 'Chicago',
            state: State.Alabama,
            zipCode: '60601',
          },
        ],
      },
      contactPerson: {
        firstName: 'Michael',
        lastName: 'Thompson',
        email: [
          {
            email: 'michael.thompson@company.com',
            verified: true,
          },
        ],
        phone: [
          {
            number: '555-5555',
            verified: true,
          },
        ],
        address: [
          {
            address: '789 Corporate Drive',
            city: 'Chicago',
            state: State.California,
            zipCode: '90210',
          },
        ],
      },
      companyTemplate:
        'Company XYZ is committed to protecting children online. For legal process, please contact our legal department at legal@company.com. Data is retained for 90 days.',
      termsOfService:
        'Users must not engage in any illegal activities. Violations will result in immediate account termination.',
      legalUrl: 'https://company.com/legal',
    };

    const result = buildReporter(reporter);

    assert.snapshot(result);
  });

  it('should build a reporter with only required fields', ({ assert }) => {
    const reporter: Reporter = {
      reportingPerson: {
        firstName: 'John',
        lastName: 'Smith',
        email: [
          {
            email: 'john.smith@company.com',
            verified: true,
          },
        ],
      },
    };

    const result = buildReporter(reporter);

    assert.snapshot(result);
  });

  it('should build a reporter with multiple contact methods', ({ assert }) => {
    const reporter: Reporter = {
      reportingPerson: {
        firstName: 'Emily',
        lastName: 'Davis',
        email: [
          {
            email: 'emily.davis@company.com',
            verified: true,
          },
          {
            email: 'e.davis@company.com',
            verified: false,
          },
        ],
        phone: [
          {
            number: '555-1111',
            verified: true,
          },
          {
            number: '555-2222',
            verified: false,
          },
        ],
      },
      companyTemplate: 'Standard reporting template for Company ABC',
      legalUrl: 'https://company.com/legal-info',
    };

    const result = buildReporter(reporter);

    assert.snapshot(result);
  });

  it('should build a reporter with contact person but no company info', ({
    assert,
  }) => {
    const reporter: Reporter = {
      reportingPerson: {
        firstName: 'David',
        lastName: 'Wilson',
        email: [
          {
            email: 'david.wilson@org.com',
            verified: true,
          },
        ],
      },
      contactPerson: {
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: [
          {
            email: 'lisa.anderson@org.com',
            verified: true,
          },
        ],
        phone: [
          {
            number: '555-7777',
            verified: true,
          },
        ],
      },
    };

    const result = buildReporter(reporter);

    assert.snapshot(result);
  });
});
