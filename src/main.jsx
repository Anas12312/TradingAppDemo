import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LogIn from './Components/LogIn.jsx'


const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {
        isLoggedIn ? 
        <App /> :
        <LogIn setIsLoggedIn={setIsLoggedIn}/>
      }      
    </>
  );
}

export default Main;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
