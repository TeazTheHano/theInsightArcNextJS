"use client"

import { BlogDetail, useBlogDetail } from '@/packages/modules/blog';
import { ARC_ContainerWithLoading as ContainerWithLoading } from '@/packages/shared/ui/ARC_loading';
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function BlogDetailPage() {
  const { id } = useParams();
  const { data: blogDetail, isLoading, error } = useBlogDetail(id as string);
  const { t: t_toast } = useTranslation('toast');

  return (
    <ContainerWithLoading 
      loadingState={isLoading} 
      errMessage={error ? t_toast('error.notFound') : ""} 
    >
      {blogDetail && <BlogDetail data={blogDetail} />}
    </ContainerWithLoading>
  );
}
