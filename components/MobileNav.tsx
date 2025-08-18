"use client";

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { NavItems } from '@/lib/constents';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export default function MobileNav() {
  return (
    <div className="md:hidden overflow-hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold">JBLM</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-6">
            {NavItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <Link
                  href={item.href}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              custom={NavItems.length}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="pt-6 border-t border-border/50"
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
