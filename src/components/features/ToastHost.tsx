import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Info, XCircle } from 'lucide-react';

type ToastTone = 'good' | 'danger' | 'info';

interface Toast {
  id: string;
  tone: ToastTone;
  title: string;
  body?: string;
}

interface ToastApi {
  push: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      push: () => undefined,
    };
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const api = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex flex-col items-center gap-2 px-4 md:bottom-6">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = t.tone === 'good' ? CheckCircle2 : t.tone === 'danger' ? XCircle : Info;
            const wrap =
              t.tone === 'good'
                ? 'border-[color:var(--color-good)]/30 bg-[color:var(--color-good-soft)] text-[color:var(--color-good)]'
                : t.tone === 'danger'
                  ? 'border-[color:var(--color-ember)]/30 bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)]'
                  : 'border-[color:var(--color-info)]/30 bg-[color:var(--color-info-soft)] text-[color:var(--color-info)]';
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                className={`pointer-events-auto flex w-full max-w-sm gap-2.5 rounded-2xl border px-3.5 py-3 shadow-lg backdrop-blur-md ${wrap}`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.body && (
                    <p className="mt-0.5 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
                      {t.body}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
