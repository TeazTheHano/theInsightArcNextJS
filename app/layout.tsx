import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import "@/styles/index.scss"
import GlobalLayout from "@/layouts/GlobalLayout";
import { ThemeProvider } from "@/hooks/useTheme";
import { ModalProvider } from "@/hooks/useModal";
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
  other: {
    'link1': '<link rel="preload" href="/assets/fonts/Epilogue-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
    'link2': '<link rel="preload" href="/assets/fonts/Epilogue-Italic-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
    'link3': '<link rel="preload" href="/assets/fonts/Inconsolata-VariableFont_wdth.ttf" as="font" type="font/ttf" crossorigin="anonymous">',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <GlobalLayout>
            <ModalProvider>
              {children}
            </ModalProvider>
          </GlobalLayout>
        </ThemeProvider >
      </body>
    </html >
  );
}
