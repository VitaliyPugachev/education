import { FC, lazy } from 'react';
import { LoginFormProps } from 'feautures/AuthByUsername/ui/LoginForm/LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));
