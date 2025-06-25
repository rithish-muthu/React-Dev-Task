import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Progress from './Pages/Progress'

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Dashboard/>
    },
    {
      path:'/progress',
      element:<Progress/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App