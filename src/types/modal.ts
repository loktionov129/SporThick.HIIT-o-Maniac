export interface ModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
}

export interface ModalState {
  isOpen: boolean;
  options: ModalOptions | null;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}
