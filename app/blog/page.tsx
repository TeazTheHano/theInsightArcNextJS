"use client"

import { useTranslation } from 'react-i18next';
import styles from './BlogList.module.css';
import LazyImage from '../../components/LazyImage/lazyImage';
import { DivFlexColumn } from '../../components/LayoutDiv/LayoutDiv';
import { BlogItem2RowGen } from '../../components/Blog/BlogListVariant';
import { TextHeadlineLarge } from '../../components/TextBox/textBox';
import Button from '../../components/Button/Button';
import { placeholderData } from '../../data/placeholderData';
import Divider from '../../components/Divider/Divider';
import { useEffect, useState, useMemo, useCallback } from 'react';
import type { BlogItemProps } from '../../data/type';
import { fetchBlogList } from '../../utils/fetchContent';
import useCheckScreenSize from '../../hooks/useCheckScreenSize';
import ContainerWithLoading from '../../components/ContainerWithLoading/ContainerWithLoading';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  { ssr: false }

)

export default function BlogList() {
  const { t } = useTranslation('blog')

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const isInSM = useCheckScreenSize(['sm']);
  const layoutConfig = useMemo(() => ({
    direction: isInSM ? "column" as const : "row" as const,
    trendingThumbSize: isInSM ? 100 as const : 300 as const,
    trendingRatio: isInSM ? '1' : undefined,
  }), [isInSM]);

  const [LATEST_POSTS, set_LATEST_POSTS] = useState<BlogItemProps[]>([]);
  const [TRENDING_POSTS, set_TRENDING_POSTS] = useState<BlogItemProps[]>([]);
  const [CATE_1_POSTS, set_CATE_1_POSTS] = useState<BlogItemProps[]>([]);
  const [CATE_2_POSTS, set_CATE_2_POSTS] = useState<BlogItemProps[]>([]);

  const sortData = useCallback((data: BlogItemProps[]) => {
    const sortedByTime = [...data].sort((a, b) => {
      const dateA = a.timeStamp ? new Date(a.timeStamp).getTime() : 0;
      const dateB = b.timeStamp ? new Date(b.timeStamp).getTime() : 0;
      return dateB - dateA;
    });

    set_LATEST_POSTS(sortedByTime.slice(0, 5) || placeholderData);
    set_TRENDING_POSTS(sortedByTime.slice(0, 5));
    const category1 = data.filter(item => item.category === 'Category 1');
    set_CATE_1_POSTS(category1.slice(0, 5) || placeholderData);
    const category2 = data.filter(item => item.category === 'Category 2');
    set_CATE_2_POSTS(category2.slice(0, 5) || placeholderData);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchBlogList()
      .then((data) => {
        sortData(data);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // TODO: handle view all
  const handleViewAll = useCallback(() => { }, []);

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="/placeholder" height={'30dvh'} maxHeight='50dvw' />

      <ContainerWithLoading loadingState={loading} errMessage={error}>

        {/* LATEST */}
        <DivFlexColumn className={styles.inspirationContainer}>
          <DivFlexColumn>
            <TextHeadlineLarge children={t('latestPost')} />
            <Button
              label={t('viewAll')}
              children={t('viewAll')}
              leadingIcon='arrow_outward'
              colorMode='Primary'
              onClick={handleViewAll} />
          </DivFlexColumn>
          <BlogItem2RowGen dataList={LATEST_POSTS} thumbSize={600} direction={layoutConfig.direction} />
        </DivFlexColumn>

        <Divider />
        {/* CATEGORY 1 */}
        <DivFlexColumn className={styles.inspirationContainer}>
          <LazyImage alt="Category 1 Banner" src="/placeholder" height={'20dvh'} maxHeight='50dvw' />
          <BlogItem2RowGen dataList={CATE_1_POSTS} thumbSize={600} direction={layoutConfig.direction} />
        </DivFlexColumn>

        <Divider />
        {/* CATEGORY 2 */}
        <DivFlexColumn className={styles.inspirationContainer}>
          <LazyImage alt="Category 2 Banner" src="/placeholder" height={'20dvh'} maxHeight='50dvw' />
          <BlogItem2RowGen dataList={CATE_2_POSTS} thumbSize={600} direction={layoutConfig.direction} />
        </DivFlexColumn>

        <Divider />
        {/* TRENDING */}
        <DivFlexColumn className={styles.inspirationContainer}>
          <TextHeadlineLarge children={t('trending')} />
          <BlogItem2RowGen dataList={TRENDING_POSTS} thumbSize={layoutConfig.trendingThumbSize} ratio={layoutConfig.trendingRatio} hideDescription />
        </DivFlexColumn>
      </ContainerWithLoading>
      <DynamicComponentWithNoSSR />

    </div>
  )
}
