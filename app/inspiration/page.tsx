"use client"

import { useEffect, useState, useCallback } from "react";
import SegmentedButton from "../../components/Button/SegmentedButton";
import { DivFlexColumn, DivFlexRow } from "../../components/LayoutDiv/LayoutDiv";
import LazyImage from "../../components/LazyImage/lazyImage";
import { TextBodyMedium, TextHeadlineLarge } from "../../components/TextBox/textBox";
import { useTranslation } from 'react-i18next'

import Button from "../../components/Button/Button";
import styles from './Inspiration.module.css'
import { IdealItemGen } from "../../components/Blog/IdealItem";
import { type BlogItemProps } from "../../data/type";
import { fetchInspirationList } from "../../utils/fetchContent";
import ContainerWithLoading from "../../components/ContainerWithLoading/ContainerWithLoading";

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


  const [data, setData] = useState<BlogItemProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  useEffect(() => {
    setLoading(true);
    fetchInspirationList()
      .then((data) => {
        setData(data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="https://ivtxx5b3es8d9dnb.public.blob.vercel-storage.com/common/inspirationBanner.jpg" height={'30dvh'} maxHeight='50dvw' />

      <ContainerWithLoading loadingState={loading} errMessage={error}>

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
                label={showDescription ? t_inspiration("hide-description") : t_inspiration("show-description")}
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
          <IdealItemGen dataList={data} squareRatio={gridView} compactMode={!showDescription} openAsNewTab />
        </div>

      </ContainerWithLoading>
    </div>
  )
}
