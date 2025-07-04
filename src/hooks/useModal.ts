import { useCallback, useState } from "react";

export const useModal = (initialState: boolean = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);
    const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

    return { isOpen, openModal, closeModal, toggleModal };
}

type ModalKey = string | null;

export const useMultiModal = () => {
  const [openKey, setOpenKey] = useState<ModalKey>(null);

  const openModal = useCallback((key: string) => setOpenKey(key), []);
  const closeModal = useCallback(() => setOpenKey(null), []);
  const isOpen = useCallback((key: string) => openKey === key, [openKey]);

  return {
    isOpen,
    openModal,
    closeModal,
    openKey, // Por si necesitas saber cuál está abierto
  };
};
