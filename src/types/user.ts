export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  billingAddress: string;
  billingAddress2: string;
  postalCode: number | null;
  role: string | null;
}
