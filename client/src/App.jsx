import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles.css';

import MainContainer from '../Components/MainContainer'
import NavBar from '../Components/NavBar'
import LoginPage from '../Pages/LoginPage';
import { myContext } from './Context';


const App = (props) => {

  const user = useContext(myContext);

  console.log('this is: ', user);

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' 
        element={user ? <MainContainer/> : <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
