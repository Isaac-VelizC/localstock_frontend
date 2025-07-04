import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import AboutStorePage from './AboutStorePage';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/ui/button/Button';
import {
  registerStoreUserSchema,
  type RegisterStoreUser,
} from '@/schema/AuthSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { countryCodes, currencyCodes } from '@/services/datas';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { completedDataAccountStore } from '@/app/features/auth/authSlice';
import Alert from '@/components/ui/alert/Alert';
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler';
import Spinner from '@/components/common/Spinner';

function getSafeCountry(code: string): RegisterStoreUser['country'] {
  return countryCodes.includes(code as any)
    ? (code as RegisterStoreUser['country'])
    : 'BO';
}

function getSafeCurrency(code: string): RegisterStoreUser['currency'] {
  return currencyCodes.includes(code as any)
    ? (code as RegisterStoreUser['currency'])
    : 'BOB';
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const handleError = useApiErrorHandler();
  const { openModal, isOpen, closeModal } = useModal();
  const { user, error, loading } = useAppSelector((state) => state.auth);

  const methods = useForm<RegisterStoreUser>({
    resolver: zodResolver(registerStoreUserSchema),
  });

  useEffect(() => {
    if (user && !user.completed_Onboarding) {
      methods.reset({
        name_store: user.name_store,
        rubro: 5,
        name: user.name,
        surnames: user.surnames,
        phone: user.phone,
        country: getSafeCountry(user.country),
        currency: getSafeCurrency(user.currency),
      });
      openModal();
    }
  }, [user, methods, openModal]);

  // Asegúrate de no renderizar nada hasta que todo esté listo
  if (loading.completed) {
    return <Spinner />;
  }

  const handleGetStartSubmit = async (data: RegisterStoreUser) => {
    try {
      await dispatch(completedDataAccountStore(data)).unwrap;
    } catch (error) {
      handleError(error);
    } finally {
      closeModal();
    }
  };

  
  return (
    <div>
      {error && (
        <div className="pb-4">
          <Alert variant={'error'} title={error} message={''} />
        </div>
      )}
      <FormProvider {...methods}>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          isFullscreen
          className="overflow-y-auto bg-white dark:bg-gray-900 p-4"
        >
          <div className="flex justify-center">
            <form
              onSubmit={methods.handleSubmit(handleGetStartSubmit)}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <AboutStorePage />
              {/* Botón */}
              <div className="flex justify-end mt-8">
                <Button type="submit" size="sm" disabled={loading.completed}>
                  {loading.completed ? 'Procesando...' : 'Comenzar'}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </FormProvider>
    </div>
  );
}
