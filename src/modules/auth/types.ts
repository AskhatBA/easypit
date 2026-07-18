export type User = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  roles: string[];
  /** Госномер приходит не из /me (это транспорт), оставляем для префилла форм. */
  carNumber?: string;
};

export type LoginPayload = {
  /** Email или телефон — бэкенд принимает и то, и другое. */
  identifier: string;
  password: string;
};

export type Session = {
  token: string;
  refreshToken: string;
  user: User;
};
