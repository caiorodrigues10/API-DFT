interface User {
  id: string;
  name: string;
  email: string | null;
  password: string;
  reg_active: boolean;
  code_active: boolean;
}

interface CreateUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export { User, CreateUser };
