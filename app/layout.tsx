import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { GoogleAnalytics } from "@/components/google-analytics"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" })

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: '%s | Eksenart'
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
        canonical: siteConfig.url,
        languages: {
            'tr-TR': `${siteConfig.url}/tr`,
            'en-US': `${siteConfig.url}/en`,
        },
    },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        alternateLocale: ['en_US'],
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: '/opengraph-image.png',
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
        images: ['/opengraph-image.png'],
        creator: "@eksenart",
        site: "@eksenart",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
        google: 'G-PSJ8P2DMBR', // Your Google Analytics ID
    },
    category: 'business',
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <head>
                <GoogleAnalytics />
                <StructuredData type="organization" />
                <StructuredData type="localBusiness" />
                <link rel="alternate" hrefLang="tr" href="https://eksenart.com/tr" />
                <link rel="alternate" hrefLang="en" href="https://eksenart.com/en" />
                <link rel="alternate" hrefLang="x-default" href="https://eksenart.com" />
            </head>
            <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased min-h-screen flex flex-col`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AnimatedBackground />
                    <NavigationHeader />
                    <Breadcrumbs />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <WhatsAppButton phoneNumber="905301204182" />
                    <Toaster position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    )
}
