export interface AuthData {
  uid: string | number;
  username?: string;
  email: string | null;
  password: string;
  phoneNumber?: string;
  isLoggedIn: boolean
}
