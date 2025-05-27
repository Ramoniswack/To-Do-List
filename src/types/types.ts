export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TodoItem {
  text: string;
  done: boolean;
  description?: string;
};