import type { Country } from '../Constants/Country';

/**
 * An estimated location.
 */
export interface EstimatedLocation {
  /** The city of the estimated location. */
  city?: string;
  /** The region of the estimated location. */
  region?: string;
  /** ISO 3166-1 alpha-2 two-character country code of the estimated location. */
  countryCode?: Country;
  /** Whether the reporter has verified the estimated location. */
  verified?: boolean;
  /** The date and time the reporter made the location estimation. */
  timestamp?: Date;
}
