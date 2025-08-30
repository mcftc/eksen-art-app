"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-4 group">
          <Logo className="transition-transform duration-300 group-hover:scale-105" />
          <span className="text-xs text-muted-foreground/80 tracking-wider font-handwriting hidden sm:inline-block">
            Where creativity meets excellence
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.navigation.main.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    pathname === child.href && "bg-accent"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {child.name}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && "bg-accent"
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center space-x-1 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
          
          <Button variant="default" size="sm" asChild>
            <Link href="/teklif-al">Teklif Al</Link>
          </Button>
          
          <ThemeToggle />
          
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t"
          >
            <nav className="container py-4">
              <ul className="space-y-2">
                {siteConfig.navigation.main.map((item) => (
                  <li key={item.href}>
                    {item.children ? (
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-accent">
                          <span>{item.name}</span>
                          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="mt-2 ml-4 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block px-3 py-2 rounded-md hover:bg-accent",
                                  pathname === child.href && "bg-accent"
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md hover:bg-accent",
                          pathname === item.href && "bg-accent"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center space-x-2 px-3 py-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center space-x-2 px-3 py-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}