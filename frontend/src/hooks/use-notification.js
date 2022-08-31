import { useSnackbar } from 'notistack';

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessMessage = (message = 'Success') => enqueueSnackbar(message, { variant: 'success' });
  const showErrorMessage = (message = 'Unknown error') => enqueueSnackbar(message, { variant: 'error' });

  return {
    showSuccessMessage,
    showErrorMessage,
  };
};

export default useNotification;
