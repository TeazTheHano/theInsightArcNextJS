"use client"

import { useEffect, useState, useCallback } from "react";
import SegmentedButton from '@/packages/shared/ui/ARC_button/SegmentedButton';
import {  DivFlexColumn, DivFlexRow  } from '@/packages/shared/ui/ARC_layout';
import { ARC_LazyImage as LazyImage } from '@/packages/shared/ui/ARC_image';
import {  TextBodyMedium, TextHeadlineLarge  } from '@/packages/shared/ui/ARC_typography';
import { useTranslation } from 'react-i18next'

import { ARC_Button as Button } from '@/packages/shared/ui/ARC_button';
import styles from './Inspiration.module.css'
import { IdealItemGen, type BlogItemContract } from '@/packages/modules/blog';
import { ARC_ContainerWithLoading as ContainerWithLoading } from '@/packages/shared/ui/ARC_loading';
import { useInspirations } from '@/packages/modules/inspiration';

export default function Inspiration() {
  const { t: t_landingPage } = useTranslation('landingPage')
  const { t: t_inspiration } = useTranslation('inspiration')
  const { t: t_toast } = useTranslation('toast')

  const [gridView, setGridView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('inspirationGridView') === 'true';
    }
    return false;
  });
  const [showDescription, setShowDescription] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('inspirationShowDescription') === 'true';
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inspirationGridView', gridView.toString());
    }
  }, [gridView]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inspirationShowDescription', showDescription.toString());
    }
  }, [showDescription]);

  const handleGridViewChange = useCallback((e: string) => setGridView(e === '1'), []);
  const handleToggleDescription = useCallback(() => setShowDescription(prev => !prev), []);


  const { data, isLoading: loading, error } = useInspirations();
  const mappedData = data ? (data as unknown as BlogItemContract[]) : [];

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="https://ivtxx5b3es8d9dnb.public.blob.vercel-storage.com/common/inspirationBanner.jpg" height={'30dvh'} maxHeight='50dvw' />

      <ContainerWithLoading loadingState={loading} errMessage={error ? (error as Error).message : undefined}>

        <DivFlexColumn className={styles.inspirationContainer}>
          <DivFlexColumn className={styles.titleSectionStyle}>
            <TextHeadlineLarge children={t_landingPage('section-4-title')} />
            <DivFlexRow className={styles.controlsStyle}>
              <SegmentedButton
                preSelected={gridView ? '1' : '0'}
                compactMode
                onChange={handleGridViewChange}
                dataList={[
                  {
                    label: t_inspiration("inspiration-segment-freeform"),
                    value: '0',
                    icon: 'dashboard_filled'
                  },
                  {
                    label: t_inspiration("inspiration-segment-grid"),
                    value: '1',
                    icon: 'grid_on_filled'
                  }
                ]}
              />
              <Button
                variantMode="Icon"
                colorMode="Secondary"
                ariaLabel={showDescription ? t_inspiration("hide-description") : t_inspiration("show-description")}
                leadingIcon={showDescription ? 'comment_disabled_filled' : 'comment_filled'}
                onClick={handleToggleDescription}
                showTitleWhileHover
              />
            </DivFlexRow>
          </DivFlexColumn>
          <TextBodyMedium children={t_landingPage('section-4-description')} />
        </DivFlexColumn>

        <div className={[styles.inspirationContainer, styles[`gridView-${gridView}`]].join(' ')}>
          {loading ? <TextBodyMedium children={t_toast('info.loading')} /> : null}
          <IdealItemGen dataList={mappedData} squareRatio={gridView} compactMode={!showDescription} openAsNewTab />
        </div>

      </ContainerWithLoading>
    </div>
  )
}
