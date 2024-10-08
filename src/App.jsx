import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { DataInfo } from './pages/DataInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/carriersafety-app' element={<DataInfo/>}/>
          </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
