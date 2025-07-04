export interface Role {
  id: number;
  name: string;
}

export interface Permission {
  id: string;
  name: string;
  module: string;
  action: string;
  slug: string;
  description: string;
}

export interface AccountInterface {
  id: string;
  username: string;
  name: string;
  surnames: string;
  email: string;
  phone: string;
  role: string;
  store: string;
  owner: boolean;
  is_active: boolean;
  is_staff: boolean;
  completed_Onboarding: boolean;
  country: string;
  currency: string;
  rubro: number;
  name_store: string;
  created_at: Date;
}

export interface UserCompletedOnboardingInterface {
  name_store: string;
  rubro: number;
  name: string;
  surnames: string;
  phone: string;
  country: string;
  currency: string;
}

export interface AccountFormInterface {
  username: string;
  name: string;
  surnames: string;
  email: string;
  phone: string;
}
