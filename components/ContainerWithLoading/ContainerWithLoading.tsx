"use client"

import React from 'react';
import LoadingIndicators from '../Loading Indicators/LoadingIndicators';
import { TextBodyLarge } from '../TextBox/textBox';
import { useTranslation } from 'react-i18next';

interface ContainerWithLoadingProps {
    children: React.ReactNode;
    loadingState: boolean;
    errMessage?: string;
}

const ContainerWithLoading: React.FC<ContainerWithLoadingProps> = ({ children, loadingState, errMessage }) => {
    const { t: t_toast } = useTranslation('toast');

    if (!loadingState && !errMessage) {
        return <>{children}</>;
    }

    if (errMessage) {
        const message = errMessage ? `${t_toast('error.loadFailed')} - ${errMessage}` : t_toast('error.unexpected');
        return <TextBodyLarge style={{ padding: 'var(--Spacing-Spacing-S)' }}>{message}</TextBodyLarge>;
    }

    return <LoadingIndicators isLoading={loadingState} />;
};

export default ContainerWithLoading;
