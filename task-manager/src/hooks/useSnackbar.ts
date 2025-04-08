import { useState } from 'react';

export const useSnackbar = () => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState(false);

  const showSnackbar = (msg: string, msgType: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setType(msgType);
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
  };

  return { message, type, open, showSnackbar };
};
