export enum EmailType {
  Home = 'Home',
  Work = 'Work',
  Business = 'Business',
}

/**
 * An email address.
 */
export interface Email {
  /** The email address. */
  email: string;
  /** Type of email address. */
  type?: EmailType;
  /** Whether the reporter has verified the email address. */
  verified?: boolean;
  /** The date and time that the reporter last verified the email address. */
  verificationDate?: Date;
}
