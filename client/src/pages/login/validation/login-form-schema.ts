import { object, string } from 'yup';

const loginFormSchema = object().shape({
  username: string().required().label('Username'),
  password: string().required().label('Password'),
});

export { loginFormSchema };
