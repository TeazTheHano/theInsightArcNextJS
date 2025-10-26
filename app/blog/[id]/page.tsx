"use client"

import BlogDetail from "@/components/Blog/BlogDetail";
import ContainerWithLoading from "@/components/ContainerWithLoading/ContainerWithLoading";
import { fetchBlogList } from "@/utils/fetchContent";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


import { useTranslation } from "react-i18next";


export default function BlogDetailPage() {
  const { id } = useParams();
  const [metadata, setMetadata] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const { t: t_toast } = useTranslation('toast');

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const blogs = await fetchBlogList(false);
      const found = blogs.find((b) => b.id === id);
      if (found) setMetadata(found);
      else setNotFound(true);
    };
    load();
  }, [id]);

  return (
    <ContainerWithLoading loadingState={!metadata} errMessage={notFound ? t_toast('error.notFound') : ""} >
      <BlogDetail metadata={metadata} />
    </ContainerWithLoading>
  );
}
