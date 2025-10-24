"use client"

import { useSEO } from "../../hooks/useSEO";

export const SEOhead = ({ meta }: { meta: any }) => {
    useSEO(meta); // <-- chỉ thêm meta tags vào <head>
    return null;  // <-- không render gì ra màn hình
};