type ApiErrorResponse = {
  detail?: string | string[];
  [key: string]: unknown;
};

export function getErrorMessage(error: unknown): string | null {
  // Si el error es un objeto con response y data (axios, fetch wrappers)
  if (typeof error === 'object' && error !== null) {
    // Por ejemplo, axios error tiene error.response.data
    // Ajusta según tu cliente HTTP
    const err = error as { response?: { data?: ApiErrorResponse }, data?: ApiErrorResponse, message?: string };

    let data: ApiErrorResponse | undefined;

    if (err.response && err.response.data) {
      data = err.response.data;
    } else if (err.data) {
      data = err.data;
    } else if (err.message) {
      // Error con mensaje simple
      return err.message;
    } else {
      data = err;
    }

    if (data) {
      // Caso 1: mensaje general en "detail"
      if (data.detail) {
        if (Array.isArray(data.detail)) {
          return data.detail.join(' ');
        }
        return String(data.detail);
      }

      // Caso 2: errores por campo, tomamos el primer mensaje encontrado
      for (const key in data) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          return String(data[key][0]);
        } else if (typeof data[key] === 'string') {
          return data[key];
        }
      }
    }
  }

  // Si no se pudo extraer mensaje
  return null;
}

export function showValidationErrors(
  errors: Record<string, unknown>,
  showToast: (msg: string, type: 'error' | 'success') => void
) {
  const traverse = (errObj: Record<string, unknown>, path = '') => {
    for (const key in errObj) {
      const current = (errObj as Record<string, unknown>)[key];
      const newPath = path ? `${path}.${key}` : key;

      if (
        typeof current === 'object' &&
        current !== null &&
        'message' in current
      ) {
        showToast((current as { message: string }).message, 'error');
      } else if (typeof current === 'object' && current !== null) {
        traverse(current as Record<string, unknown>, newPath);
      }
    }
  };
  traverse(errors);
}
