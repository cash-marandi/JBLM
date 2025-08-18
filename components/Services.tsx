import React from 'react';
import Header from './reusable-components/Header';
import { CardHoverEffectDemo } from './services-cards';

export default function Services() {
  return (
    <section id="services" className="min-h-screen items-center justify-center">
        <Header title='Our Services'/>
        <h2 className='text-3-s text-center items-center justify-center m-4 px-4'>We offer comprehensive cost management and project support across all stages of the 
          construction process. Our core services include:
        </h2>

        <CardHoverEffectDemo />

    </section>
  )
};
