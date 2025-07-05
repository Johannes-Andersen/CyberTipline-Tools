import type { Country } from '../Constants/Country';
import type { State } from '../Constants/State';

export enum AddressType {
  Home = 'Home',
  Business = 'Business',
  Billing = 'Billing',
  Shipping = 'Shipping',
  Technical = 'Technical',
}

/**
 * A physical street address.
 */
export interface Address {
  /** Street address. */
  address?: string;
  /** City. */
  city?: string;
  /** Zip or postal code. */
  zipCode?: string;
  /** US state or territory postal abbreviation. */
  state?: State;
  /** State, province, or region if not in the United States. */
  nonUsaState?: string;
  /** ISO 3166-1 alpha-2 two-character country code. */
  country?: Country;
  /** Type of address. */
  type?: AddressType;
}
