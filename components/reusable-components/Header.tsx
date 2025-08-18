import React from 'react'

type HeaderProps = {
  title: string;
}


export default function Header({ title }: HeaderProps) {
  return (
    <div>
      <h1 className='text-3xl font-bold text-center py-5 bg-gradient-to-r 
      bg-yellow-300 to-orange-500 text-transparent bg-clip-text'>{title}</h1>
    </div>
  )
}
