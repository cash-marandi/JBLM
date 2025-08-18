import { NavItems } from '@/lib/constents'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'

export default function Navigation() {
  return (
    <nav className='sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b 
    border-border/50 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
                <div className='flex-shrink-0'>
                    {/* Logo */}
                    <img src="/image/logo.png" width={80} height={64} alt="Logo" />

                </div>
                <div className="flex items-center">
                    <div className='hidden md:flex space-x-8 items-center'>
                            {NavItems.map((item) => (
                                <Link key={item.name} href={item.href}
                                className='text-sm font-medium text-muted-foreground 
                                hover:text-foreground transition-colors duration-200'>
                                    {item.name}
                                </Link>
                            ))}
                            <ThemeToggle/>
                    </div>
                    <MobileNav />
                </div>
            </div>

        </div>
    </nav>
  )
}

