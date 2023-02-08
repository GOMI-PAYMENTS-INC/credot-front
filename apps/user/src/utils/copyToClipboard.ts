import { toast } from 'react-toastify';

export const copyToClipboard = (toastMsg: string, text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => toast.success(toastMsg));
  }
};
