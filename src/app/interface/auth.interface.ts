export interface ResponseAuth {
  ok:      boolean;
  message: string;
  token:   string;
}

export interface User {
  name:       string;
  lastname:   string;
  email:      string;
  role?:      string;
  password?:  string;
}
