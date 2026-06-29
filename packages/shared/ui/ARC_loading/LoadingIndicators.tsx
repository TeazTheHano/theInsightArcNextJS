"use client"

import React from 'react'
import { DivFlexColumn, DivFlexRow } from '@/packages/shared/ui/ARC_layout';
import { TextTitleSmall } from '@/packages/shared/ui/ARC_typography';
import { useTranslation } from 'react-i18next';

export interface LoadingIndicatorsProps {
    isLoading: boolean;
}

export const ARC_LoadingIndicators: React.FC<LoadingIndicatorsProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    const { t: t_toast } = useTranslation('toast')
    return (
        <DivFlexColumn style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--Spacing-Spacing-M)',
            gap: 'var(--Spacing-Spacing-S)'
        }}>
            <DivFlexRow style={{
                alignItems: 'center',
                gap: 'var(--Spacing-Spacing-XS)'
            }}>
                <div className="loading-spinner" style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid var(--Schemes-Outline)',
                    borderTop: '2px solid var(--Schemes-Primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <TextTitleSmall color="var(--Schemes-On-Surface-Variant)">
                    {t_toast('info.loading')}
                </TextTitleSmall>
            </DivFlexRow>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </DivFlexColumn>
    );
};

export default ARC_LoadingIndicators;
