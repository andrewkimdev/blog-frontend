export interface SignUpResponse {
  user: SupabaseUser;
  session: Session | null;
}

export interface SupabaseUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: AppMetadata;
  user_metadata: Record<string, unknown>; // Assuming user_metadata can have any structure
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

// Session interface is not defined in the provided data
// Assuming its structure or using 'any' if the structure is unknown
export interface Session {
  // Define the properties of Session here
  // Example:
  // token: string;
  // expires_at: string;
  // ...
  // Or use 'any' if the structure is unknown
  [key: string]: any;
}
