import { object, string } from 'yup';

export const loginFormSchema = object().shape({
  username: string().required().label('Username'),
  password: string().required().label('Password'),
});
