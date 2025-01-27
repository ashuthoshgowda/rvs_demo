export interface UserCreateResponse {
  id: string;
  email: string;
  missing_info: {
    about_me: boolean;
    birthdate: boolean;
    address: boolean;
  };
  message: string;
}

export interface UserDisplayResponse {
  id: string;
  email: string;
  aboutMe?: string | null;
  address?: {
    id: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    userId: string;
  } | null;
  birthdate?: Date | null;
}

export interface AdminSettingsResponse {
  secondPageComponents: string;
  thirdPageComponents: string;
}
