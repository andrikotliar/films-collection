import styles from './login-form.module.css';
import { Button, FormTextInput, FormPasswordInput, Logo } from '@/components';
import { LogInIcon } from 'lucide-react';
import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';

type LoginFormProps = {
  isSaving: boolean;
  onSubmit: SubmitHandler<any>;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, isSaving }) => {
  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <Logo className={styles.loginLogo} />
      <FormTextInput name="username" label="Username" />
      <FormPasswordInput name="password" label="Password" />
      <Button type="submit" icon={<LogInIcon />} isLoading={isSaving}>
        Login
      </Button>
    </form>
  );
};
