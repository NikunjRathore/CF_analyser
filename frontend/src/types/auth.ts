export interface User {
  id: string;
  name: string;
  email: string;
  codeforces_ID: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MeResponse {
  user: User;
}
