"use client"

import { BlogDetail, useBlogDetail } from '@/packages/modules/blog';
import { ARC_ContainerWithLoading as ContainerWithLoading } from '@/packages/shared/ui/ARC_loading';
import { useTranslation } from "react-i18next";
import { BlogDetailContract } from '@/packages/modules/blog/application/contracts/blog.contract';

export default function ClientWrapper({ id, initialData }: { id: string, initialData: BlogDetailContract }) {
  const { data: blogDetail, isLoading, error } = useBlogDetail(id, initialData);
  const { t: t_toast } = useTranslation('toast');

  return (
    <ContainerWithLoading 
      loadingState={isLoading && !blogDetail} 
      errMessage={error ? t_toast('error.notFound') : ""} 
    >
      {blogDetail && <BlogDetail data={blogDetail} />}
    </ContainerWithLoading>
  );
}
