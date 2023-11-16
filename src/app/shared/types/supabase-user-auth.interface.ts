export interface LoginResponse extends AuthBaseResponse {
  session: Session; // Specific to login
}

export interface SignupResponse extends AuthBaseResponse {
  // Fields specific to signup, if any
}

export interface DecodedAuthToken {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: Record<string, unknown>; // Assuming user_metadata can have any structure
  role: string;
  aal: string;
  amr: AuthenticationMethod[];
  session_id: string;
}

export interface AuthenticationMethod {
  method: string;
  timestamp: number;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: SupabaseUser;
}

export interface AuthBaseResponse {
  user: SupabaseUser;
  error: Error | null; // Common error field for both responses
}

export interface SupabaseUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  email_confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: Record<string, unknown>;
  identities: Identity[];
  created_at: string;
  updated_at: string;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface Identity {
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
}

export interface IdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}
