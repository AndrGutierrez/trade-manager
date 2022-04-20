import React from 'react'
import CandleSticks from '../components/CandleSticks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App(){
    return (
        <BrowserRouter>
            <Routes> 
                <Route exact path='/' element={<CandleSticks />} />
            </Routes>
        </BrowserRouter>
    )
}
