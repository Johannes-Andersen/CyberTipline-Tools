export enum PhoneType {
  Mobile = 'Mobile',
  Home = 'Home',
  Business = 'Business',
  Work = 'Work',
  Fax = 'Fax',
  Internet = 'Internet',
}

/**
 * A phone number.
 */
export interface Phone {
  /** The phone number. */
  number: string;
  /** Type of phone number. */
  type?: PhoneType;
  /** Whether the reporter has verified the phone number. */
  verified?: boolean;
  /** The date and time that the reporter last verified the phone number. */
  verificationDate?: Date;
  /** The country calling code for the phone number. Starts with a +. */
  countryCallingCode?: `+${string}`;
  /** The extension for the phone number. */
  extension?: string;
}
