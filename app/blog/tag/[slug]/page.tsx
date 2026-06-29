import {  TextDisplayMedium  } from '@/packages/shared/ui/ARC_typography';
import BlogTagClientPage from "./BlogTagClientPage";

export default async function Page({ params }: { params: { slug: string } }) {
    return (
       <BlogTagClientPage />
    );
}
