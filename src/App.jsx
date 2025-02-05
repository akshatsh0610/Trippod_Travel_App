import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/custom/Hero'
import Footor from './components/custom/Footer'
import Middle from './components/custom/Middle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* Hero Compoennt */}
     <Hero/>
     <Middle/>
    </>
  )
}

export default App
