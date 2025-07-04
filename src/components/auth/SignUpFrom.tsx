import { Link, useNavigate } from 'react-router-dom';
import Label from '../custom/form/Label';
import Input from '../custom/form/input/InputField';
import { FiEyeOff, FaEye } from '@/utils/icons';
import Checkbox from '../custom/form/input/Checkbox';
import { useEffect, useRef, useState } from 'react';
import { registerSchema } from '@/schema/AuthSchema';
import type { RegisterFormData } from '@/schema/AuthSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  sendVerificationCode,
  register as userRegisterAPI,
} from '@/app/features/auth/authSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler';
import ButtonGoogle from '../ui/button/ButtonGoogle';
import Button from '../ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { Modal } from '../ui/modal';
import Alert from '../ui/alert/Alert';
import ROUTES from '@/routes/types';

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleError = useApiErrorHandler();
  const { isOpen, openModal, closeModal } = useModal();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingData, setPendingData] = useState<RegisterFormData | null>(null);

  const codeInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Temporizador de reenviar código
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  useEffect(() => {
    if (isOpen && codeInputRef.current) {
      codeInputRef.current.focus();
    }
  }, [isOpen]);

  // Paso 1: Enviar código de verificación
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(sendVerificationCode(data.email)).unwrap();
      setPendingData(data);
      setResendTimer(60);
      openModal();
    } catch (err) {
      handleError(err);
    }
  };

  // Paso 2: Verificar código y registrar usuario
  const onVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');

    if (!pendingData) return;

    if (verificationCode.length !== 6 || !/^[0-9]{6}$/.test(verificationCode)) {
      setCodeError('El código debe tener 6 dígitos.');
      return;
    }

    setCodeLoading(true);
    try {
      await dispatch(
        userRegisterAPI({ ...pendingData, code: verificationCode }),
      ).unwrap();
      setVerificationCode('');

      closeModal();
      navigate(ROUTES.HOME);
    } catch (err) {
      if (error) {
        closeModal();
      }
      setCodeError('Código incorrecto o expirado');
      handleError(err);
    } finally {
      setCodeLoading(false);
    }
  };

  // Reenviar Codigo
  const onResendCode = async () => {
    if (resendTimer > 0 || !pendingData) return;
    try {
      setVerificationCode('');
      await dispatch(sendVerificationCode(pendingData.email)).unwrap();
      setResendTimer(60);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div className="mt-10">
            <div className="mb-5 sm:mb-8 text-center">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Registrarse
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ingresa tu correo electrónico y contraseña para acceder a tu
                cuenta.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="pb-4">
                  <Alert variant={'error'} title={error} message={''} />
                </div>
              )}
              <div className="space-y-4">
                {/* <!-- Negocio --> */}
                <div>
                  <Label htmlFor="store_name" required>
                    Nombre del Negocio
                  </Label>
                  <Input
                    type="text"
                    id="store_name"
                    placeholder="Ej. Pernos"
                    {...register('store_name')}
                    required
                    error={!!errors.store_name}
                    hint={errors.store_name?.message}
                  />
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label htmlFor="email" required>
                    Correo electrónico
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="ejemplo@correo.com"
                    {...register('email')}
                    required
                    error={!!errors.email}
                    hint={errors.email?.message}
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label htmlFor="password" required>
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      required
                      error={!!errors.password}
                      hint={
                        errors.password?.message ??
                        'Mínimo 8 caracteres, combina letras y números.'
                      }
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      aria-label={
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                      role="button"
                    >
                      {showPassword ? (
                        <FaEye className="text-gray-500 dark:text-gray-400" />
                      ) : (
                        <FiEyeOff className="text-gray-500 dark:text-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3 pt-6 pb-4">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={() => setIsChecked(true)}
                    required
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400 text-sm">
                    Al crear una cuenta, aceptas nuestros{' '}
                    <span className="text-gray-800 dark:text-white/90 cursor-pointer underline">
                      Términos y Condiciones
                    </span>{' '}
                    y{' '}
                    <span className="text-gray-800 dark:text-white/90 cursor-pointer underline">
                      Política de Privacidad
                    </span>
                    .
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button
                    type="submit"
                    disabled={loading.register}
                    className="w-full"
                    size={'sm'}
                  >
                    {loading.register ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="relative py-2 sm:py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <ButtonGoogle />
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal para ingresar código */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-sm p-6 rounded-xl bg-white dark:bg-gray-900"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Verifica tu correo
        </h3>
        <form onSubmit={onVerifyCode} className="flex flex-col space-y-4">
          <Label htmlFor="verificationCode" required>
            Código de verificación
          </Label>
          <Input
            id="verificationCode"
            name="verificationCode"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            error={!!codeError}
            hint={codeError}
            ref={codeInputRef}
            disabled={codeLoading}
            autoFocus
          />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onResendCode}
              disabled={resendTimer > 0}
              className={`text-sm underline text-blue-600 ${resendTimer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {resendTimer > 0
                ? `Reenviar código en ${resendTimer}s`
                : 'Reenviar código'}
            </button>

            <Button type="submit" disabled={codeLoading}>
              {codeLoading ? (
                <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
              ) : (
                'Verificar'
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
