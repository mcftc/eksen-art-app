import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" })

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
        type: "website",
        locale: "tr_TR",
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@eksenart",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased min-h-screen flex flex-col`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AnimatedBackground />
                    <NavigationHeader />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <Toaster position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    )
}
