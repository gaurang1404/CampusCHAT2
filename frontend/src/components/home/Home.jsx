import React from 'react'
import { NavBar } from '../shared/NavBar'
import { Hero } from './Hero'
import { HomeCard } from './HomeCard'
import { Footer } from '../shared/Footer'

export const Home = () => {
  return (
    <div> 
        <NavBar/> 
        <Hero/>
        <HomeCard/>
        <Footer/>
    </div>
  )
}
