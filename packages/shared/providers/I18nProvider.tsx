"use client";

import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { I18N_NAMESPACES, i18nReady } from '@/i18n';

const LoadingTranslations = () => (
  <div aria-busy="true" role="status">Loading interface…</div>
);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // KHU VỰC THAY ĐỔI: chờ mọi namespace trước khi render UI, tránh hiển thị key.
  useEffect(() => {
    let mounted = true;
    const initialize = async () => {
      try {
        await i18nReady;
        await i18n.loadNamespaces(I18N_NAMESPACES);
        if (mounted) setStatus('ready');
      } catch {
        if (mounted) setStatus('error');
      }
    };
    void initialize();
    return () => { mounted = false; };
  }, []);

  if (status === 'loading') return <LoadingTranslations />;
  if (status === 'error') return <p role="alert">Unable to load interface language.</p>;

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<LoadingTranslations />}>{children}</Suspense>
    </I18nextProvider>
  );
}
