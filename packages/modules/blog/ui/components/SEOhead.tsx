"use client"

import { useSEO } from '@/hooks/useSEO';

export const SEOhead = ({ meta }: { meta: import('../../application/contracts/blog.contract').BlogItemContract }) => {
    useSEO(meta); // <-- chỉ thêm meta tags vào <head>
    return null;  // <-- không render gì ra màn hình
};