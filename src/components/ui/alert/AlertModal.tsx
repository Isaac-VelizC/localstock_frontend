import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type AlertModalProps = {
  title: string;
  message?: string;
  openModal: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
};

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  message,
  openModal,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  showCancelButton = true
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  if (!openModal) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{title}</h2>

        {message && (
          <p className="text-gray-700 dark:text-gray-300 text-sm text-center mb-6">
            {message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          {showCancelButton && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
