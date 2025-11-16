import { TextDisplayMedium } from "@/components/TextBox/textBox";
import BlogTagClientPage from "./BlogTagClientPage";

export default async function Page({ params }: { params: { slug: string } }) {
    return (
       <BlogTagClientPage />
    );
}
