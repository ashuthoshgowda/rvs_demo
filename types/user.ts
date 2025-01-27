export type UserType = {
  id: string;
  email: string;
  password: string;
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
};
