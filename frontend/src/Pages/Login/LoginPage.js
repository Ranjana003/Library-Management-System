// LoginPage.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Assuming you have a custom useAuth hook
import classes from './loginPage.module.css';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button'; // Make sure you import Button correctly
import Input from '../../Components/Input/Input';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password}
          />
          
          <Button type="submit" text="Login" />
          </form>
      </div>
    </div>
  );
}
