import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Spiner from '@mui/material/CircularProgress';

import 'react-toastify/dist/ReactToastify.css';
import styles from './SignInForm.module.scss';
import { muiInputStyle } from 'data/styles';

import { useSigninMutation } from 'store/services/authApi';

import { Inputs, ResponseSignIn, ErrorSignIn } from './types';

function SignInForm() {
  const [signIn, { isLoading }] = useSigninMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const loginUser = async (value: Inputs) => {
    try {
      const response: ResponseSignIn = await signIn(value).unwrap();
      if (response.token) {
        localStorage.setItem('KanBanToken', response.token);
        localStorage.setItem('KanBanLogin', value.login);
        toast.success(`Hello, ${value.login}`);
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as ErrorSignIn;
      switch (error.status) {
        case 403:
          toast.error('User was not founded!');
          break;
        default:
          toast.error('Unknown error');
      }
    }
  };

  const onSubmit = (data: Inputs) => loginUser(data);

  return isLoading ? (
    <div className={styles.spinWrapper}>
      <Spiner color="inherit" />
    </div>
  ) : (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={muiInputStyle}
        size="small"
        id="login"
        label={errors.login ? '⚠Login is required' : 'Login'}
        variant="outlined"
        error={!!errors.login}
        {...register('login', {
          required: true,
        })}
      />
      <TextField
        sx={muiInputStyle}
        size="small"
        type="password"
        id="password"
        label={errors.password ? '⚠Password is required' : 'Password'}
        variant="outlined"
        error={!!errors.password}
        {...register('password', {
          required: true,
        })}
      />
      <MuiButton type="submit" variant="contained">
        Sign In
      </MuiButton>
      <div className={styles.line}>
        <hr />
        OR
        <hr />
      </div>
    </form>
  );
}

export default SignInForm;
