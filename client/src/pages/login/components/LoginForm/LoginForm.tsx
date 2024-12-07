import styles from './LoginForm.module.css';
import { Button, FormTextInput, FormPasswordInput } from '@/components';
import { Logo } from '@/components/Logo/Logo';
import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

type LoginFormProps = {
  onSubmit: SubmitHandler<any>;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <Logo className={styles.loginLogo} />
      <FormTextInput name="username" label="Username" />
      <FormPasswordInput name="password" label="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
};
