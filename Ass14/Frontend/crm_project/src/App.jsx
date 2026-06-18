
import React, { Children } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AdminRoute from './Routes/AdminRoute'
import UserRoute from './Routes/UserRoute'
import Customer from './Pages/Customer'
import ErrorPage from './Pages/ErrorPage'
import Service from './Pages/Service'

const router = createBrowserRouter ([
  {
    path:"/",
    element:<RootLayout/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path:"/",
        element:<Login/>,
        index: true
      },
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/register",
        element:<Register/>
      },{
        path:"/crm",
        element:(<AdminRoute>
          <Customer/>
        </AdminRoute>)
      }
      ,{
        path:"/services",
        element:(<UserRoute>
          <Service/>
        </UserRoute>)
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App