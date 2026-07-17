export type User = {
  id: string;
  name: string;
  phone: string;
  carNumber?: string;
};

export type LoginPayload = {
  phone: string;
  code: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
