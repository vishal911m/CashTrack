import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/userContext'
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <UserProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login /> } />
          <Route path="/signUp" exact element={<SignUp /> } />
          <Route path="/dashboard" exact element={<Home /> } />
          <Route path="/income" exact element={<Income /> } />
          <Route path="/expense" exact element={<Expense /> } />
        </Routes>
      </BrowserRouter>
    </div>

    <Toaster 
      toastOptions={{
        className:"",
        style: {
          fontSize:'13px'
        },
      }}
    />
    </UserProvider>
  )
}

export default App

const Root = ()=>{
  //Check if the token exists in the localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise login
  return isAuthenticated ?(
   <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};