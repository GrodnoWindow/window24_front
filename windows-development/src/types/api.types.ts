export type LoginCredentials = {
  username: string;
  password: string;
};

export type TokenPayload = {
  access: string;
  refresh: string;
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  is_active: boolean;
};

export interface GetInfinitePagesInterface<T> {
  nextId?: number;
  previousId?: number;
  data: T;
  count: number;
}

export type Call = {
  id: number;
  id_call: string;
  number: string;
  datetime: string;
  call_status: string;
  call_type: string;
  name_client: string;
  status: string;
  comment: string;
  manager: string;
};
