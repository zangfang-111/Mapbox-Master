import { toast } from 'react-toastify';

export const notification = (type: string, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message);
      return;
    case 'warn':
      toast.warn(message);
      return;
    case 'error':
      toast.error(message);
      return;
    case 'info':
      toast.info(message);
      return;
    default:
      toast(message);
  }
};
