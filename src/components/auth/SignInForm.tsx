import { FaEye, FiEyeOff } from '@/utils/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Label from '../custom/form/Label';
import Input from '../custom/form/input/InputField';
import Checkbox from '../custom/form/input/Checkbox';
import Button from '../ui/button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { loginSchema, type LoginFormData } from '@/schema/AuthSchema';
import { login, fetchUser } from '@/app/features/auth/authSlice';
import ButtonGoogle from '../ui/button/ButtonGoogle';

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap();
      await dispatch(fetchUser()).unwrap();
    } catch (err) {
      console.error('Correo o contraseña incorrectos.', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 py-4">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Iniciar sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo electrónico y contraseña para acceder a tu
              cuenta.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <p className="text-red-600 text-sm py-2">
                  {typeof error === 'string'
                    ? error
                    : 'Ocurrió un problema al iniciar sesión. Por favor, verifica tus datos e inténtalo nuevamente.'}
                </p>
              )}
              <div className="space-y-6">
                <div>
                  <Label>
                    Correo electrónico <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="tucorreo@ejemplo.com"
                    {...register('email')}
                    error={!!errors.email}
                    hint={
                      errors.email?.message ??
                      'Ingresa un correo válido para acceder.'
                    }
                  />
                </div>
                <div>
                  <Label>
                    Contraseña <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña segura"
                      {...register('password')}
                      error={!!errors.password}
                      hint={
                        errors.password?.message ??
                        'Al menos 8 caracteres, evita contraseñas comunes.'
                      }
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <FaEye className="text-gray-500 dark:text-gray-400" />
                      ) : (
                        <FiEyeOff className="text-gray-500 dark:text-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      aria-label="Mantener sesión iniciada"
                    />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Mantener sesión iniciada
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="sm"
                    disabled={loading.login}
                  >
                    {loading.login ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </div>
              </div>
            </form>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  O
                </span>
              </div>
            </div>
            <ButtonGoogle />

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
