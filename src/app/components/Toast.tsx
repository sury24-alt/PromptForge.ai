'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  onDone: () => void;
}

export default function Toast({ message, visible, onDone }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      setExiting(false);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDone]);

  if (!visible) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${exiting ? 'exiting' : ''}`}>
        <Check className="w-4 h-4" />
        {message}
      </div>
    </div>
  );
}
