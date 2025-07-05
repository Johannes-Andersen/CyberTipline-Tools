/**
 * Generic wrapper for API responses that the CyberTipline Client returns
 */
export interface ResponseWrapper<T> {
  /** The wrapped response data */
  data: T;
  /**
   * Request ID from NCMEC's API. Used for troubleshooting,
   *    *
   * @see https://report.cybertip.org/ispws/documentation/index.html#request-ids
   */
  requestId: string;
}

/**
 * Environment options for the CyberTipline API
 */
export enum Environment {
  /** Production environment - https://report.cybertip.org/ispws/documentation/index.html */
  Production = 'production',
  /** Testing environment - https://exttest.cybertip.org/ispws/documentation/index.html */
  Testing = 'testing',
}

/**
 * Configuration options for the CyberTipline client
 */
export interface ClientConfig {
  /** The environment to use (production or testing) */
  environment: Environment;
  /** API credentials provided by NCMEC */
  credentials: {
    /** * Username provided by NCMEC */
    username: string;
    /** Password provided by NCMEC */
    password: string;
  };
}
