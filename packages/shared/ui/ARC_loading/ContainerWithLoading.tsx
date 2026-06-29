"use client"

import React from 'react';
import { ARC_LoadingIndicators } from './LoadingIndicators';
import { TextBodyLarge } from '@/packages/shared/ui/ARC_typography';
import { useTranslation } from 'react-i18next';

export interface ContainerWithLoadingProps {
    children: React.ReactNode;
    loadingState: boolean;
    errMessage?: string;
}

export const ARC_ContainerWithLoading: React.FC<ContainerWithLoadingProps> = ({ children, loadingState, errMessage }) => {
    const { t: t_toast } = useTranslation('toast');

    if (!loadingState && !errMessage) {
        return <>{children}</>;
    }

    if (errMessage) {
        const message = errMessage ? `${t_toast('error.loadFailed')} - ${errMessage}` : t_toast('error.unexpected');
        return <TextBodyLarge style={{ padding: 'var(--Spacing-Spacing-S)' }}>{message}</TextBodyLarge>;
    }

    return <ARC_LoadingIndicators isLoading={loadingState} />;
};

export default ARC_ContainerWithLoading;
