import { Metadata, ResolvingMetadata } from 'next';
import { GitHubBlogGateway } from '@/packages/modules/blog/infrastructure/github-blog.gateway';
import ClientWrapper from './ClientWrapper';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const gateway = new GitHubBlogGateway();
  try {
    const blogDetail = await gateway.getBlogDetail(id);
    
    return {
      title: blogDetail.meta.title + ' | The insightArc',
      description: blogDetail.meta.description || 'Tech, Design and Culture explore',
      openGraph: {
        title: blogDetail.meta.title,
        description: blogDetail.meta.description,
        images: blogDetail.meta.coverImage ? [blogDetail.meta.coverImage] : [],
        type: 'article',
        publishedTime: blogDetail.meta.timeStamp,
        authors: [blogDetail.meta.authorName || 'The insightArc'],
      },
    }
  } catch (e) {
    return {
      title: 'Not Found | The insightArc',
    }
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const gateway = new GitHubBlogGateway();
  
  let initialData = null;
  try {
    initialData = await gateway.getBlogDetail(id);
  } catch (e) {
    // If it fails on the server, we let React Query retry or fail on the client
  }

  return (
    <ClientWrapper id={id} initialData={initialData as any} />
  );
}
