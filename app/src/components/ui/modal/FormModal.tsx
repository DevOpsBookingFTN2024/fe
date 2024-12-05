import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export interface ModalProps {
  title?: string;
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  primaryAction?: () => void;
  primaryText: string;
  hasSave?: boolean;
  hasCancel: boolean;
  //   icon?: React.ReactElement;
  form: string;
  // onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  isLoading?: boolean;
  secondaryText?: string;
}

export default function FormModal({
                                    isOpen,
                                    closeModal,
                                    children,
                                    hasCancel,
                                    title,
                                    isLoading,
                                    secondaryText,
                                  }: ModalProps) {

  const handleCloseModal = () => {
    if (!isLoading) {
      closeModal();
    }
  };

  return (
      <Dialog open={isOpen} onClose={handleCloseModal}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {hasCancel && (
              <Button onClick={handleCloseModal} disabled={isLoading}>
                {secondaryText ? secondaryText : "Odustani"}
              </Button>
          )}

        </DialogActions>
      </Dialog>
  );
}
