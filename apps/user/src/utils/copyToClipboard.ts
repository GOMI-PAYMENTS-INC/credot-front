import { toast } from 'react-toastify';

export function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}

export const copyToClipboard = async (toastMsg: string, text: string) => {
  if (isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return toast.success(toastMsg);
  }
};
