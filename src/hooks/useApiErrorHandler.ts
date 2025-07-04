// src/hooks/useApiErrorHandler.ts
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/utils/errorUtils';

export function useApiErrorHandler() {
  const { showToast } = useToast();

  return (error: unknown, fallbackMessage = 'Ocurrió un error.') => {
    const message = getErrorMessage(error) || fallbackMessage;
    showToast(message, 'error');
  };
}
