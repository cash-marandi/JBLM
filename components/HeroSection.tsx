"use client"

import React from 'react';
import { motion } from "motion/react"
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section>
        <div id='Hero' className='min-h-[90vh] flex items-center justify-center
        px-4 sm:px-6 lg:px-8 overflow-hidden'> 
        <div className='max-w-7xl mx-auto '>
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
                {/* Left Side Content */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='text-center lg:text-left'>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-serif 
                    font-bold text-foreground loading-tight mb-6'>
                        Welcome to <span className='text-primary italic'>JBLM Quantity Surveyors</span>
                    </h1>

                    <p className='text-xl md:text-2xl text-muted-foreground mb-8'>
                        Your trusted partner in construction cost management and project success.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}>
                        <Button size="lg" className='group'>Read the Latest News{""}
                            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                    </motion.div>
                    
                </motion.div>   
                {/* Right Side Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='hidden lg:block'>

                    <div className='releative'>
                        <div className='w-80 h-80 bg-gradient-to-br from-primary/20 
                        to-secondary/20 rounded-full blur-3xl absolute -top-10 -right-10'></div>
                        <img src="/image/teamlanding.png" alt="Hero Image" className='w-full h-auto rounded-2xl shadow-2xl' />
                
                    </div>
                </motion.div>

            </div>

        </div>
          
        </div>
    </section>
    
  )
}
