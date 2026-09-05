import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import "@/styles/index.scss"
import GlobalLayout from "@/layouts/GlobalLayout";
import { ThemeProvider } from "@/hooks/useTheme";
import { ModalProvider } from "@/hooks/useModal";
import ReportWebVitals from "./reportWebVitals";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { I18nProvider, QueryProvider } from "@/packages/shared/providers";
import { Analytics } from "@vercel/analytics/next"

// import "../i18n"


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "The insightArc",
  description: "Tech, Design and Culture explore",
  metadataBase: new URL('https://theinsightarc.com'),
  openGraph: {
    title: "The insightArc",
    description: "Tech, Design and Culture explore",
    url: 'https://theinsightarc.com',
    siteName: 'The insightArc',
    images: [
      {
        url: 'https://ivtxx5b3es8d9dnb.public.blob.vercel-storage.com/common/theinsightArcbanner.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  other: {
    'link1': '<link rel="preload" href="/assets/fonts/Epilogue-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
    'link2': '<link rel="preload" href="/assets/fonts/Epilogue-Italic-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
    // 'link3': '<link rel="preload" href="/assets/fonts/Inconsolata-VariableFont_wdth.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
    'link3': '<link rel="preload" href="/assets/fonts/SpaceGrotesk-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        {/* KHU VỰC THAY ĐỔI: i18n được khởi tạo tại application composition root. */}
        <I18nProvider>
          <QueryProvider>
            <ThemeProvider>
              <GlobalLayout>
                <ModalProvider>
                  {children}
                  <ReportWebVitals />
                </ModalProvider>
              </GlobalLayout>
            </ThemeProvider>
          </QueryProvider>
        </I18nProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html >
  );
}
