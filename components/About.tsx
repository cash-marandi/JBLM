import React from 'react'
import { TextGenerateEffect } from './ui/Text-generate-effect'
import Header from './reusable-components/Header'
import { CometCardDemo } from './header-comet-card'


export default function About() {
  return (
    <section id="about" className="min-h-screen w-full items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <Header title='About Us'/>

        <div className="flex flex-col lg:flex-row align-items-center justify-center gap-8">
            <div className="lg:w-1/2 w-full relative flex items-center justify-center">
              <CometCardDemo/>
            </div>
            <div className="lg:w-1/2 max-w-1xl mx-auto mt-20  ">
              <TextGenerateEffect className="text-7-xl m-10" words="Established in June 2016, JBLM Quantity Surveyors is a proudly South African firm based in Nelspruit. We are committed to delivering excellence in quantity surveying, cost management, and construction consulting across public and private sectors. Backed by a highly qualified team with local and international experience, we deliver value-driven solutions from project inception to final account." />
            </div>
        </div>
    </section>
  )
}

