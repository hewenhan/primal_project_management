import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ModalContextType {
  confirm: (message: string, title?: string) => Promise<boolean>;
  alert: (message: string, title?: string) => Promise<void>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalState {
  isOpen: boolean;
  type: 'alert' | 'confirm';
  message: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: 'alert',
    message: '',
    title: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const confirm = useCallback((message: string, title: string = 'Confirm') => {
    return new Promise<boolean>((resolve) => {
      setModal({
        isOpen: true,
        type: 'confirm',
        message,
        title,
        onConfirm: () => {
          setModal((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setModal((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const alert = useCallback((message: string, title: string = 'Alert') => {
    return new Promise<void>((resolve) => {
      setModal({
        isOpen: true,
        type: 'alert',
        message,
        title,
        onConfirm: () => {
          setModal((prev) => ({ ...prev, isOpen: false }));
          resolve();
        },
        onCancel: () => {
           // Alert only has OK, but safely handle close
           setModal((prev) => ({ ...prev, isOpen: false }));
           resolve();
        },
      });
    });
  }, []);

  return (
    <ModalContext.Provider value={{ confirm, alert }}>
      {children}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-primary/50 rounded-lg p-6 max-w-md w-full shadow-[0_0_30px_rgba(0,240,255,0.2)] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-white tracking-wide uppercase">{modal.title}</h3>
                </div>
                <button onClick={modal.onCancel} className="text-gray-500 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
                {modal.message}
            </p>

            <div className="flex justify-end gap-3">
                {modal.type === 'confirm' && (
                    <button
                        onClick={modal.onCancel}
                        className="px-4 py-2 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors uppercase text-sm font-bold"
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={modal.onConfirm}
                    className="px-6 py-2 rounded bg-primary text-black font-bold uppercase tracking-wider hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                >
                    {modal.type === 'confirm' ? 'Confirm' : 'OK'}
                </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
