import { Fitness } from './page/fitness'
import { About } from './page/about'
import { Routes, Route, useParams } from "react-router-dom";
import { RequireAuth } from './components/RequireAuth'
import { Login } from './page/login'
import { Logout } from './page/logout'
import { Signup } from './page/signup'
import { Index } from './page/index'
import { Offline } from './page/offline'

import React, { useState } from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.min.css';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [lineState, setLineState] = useState(navigator.onLine) 
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  window.addEventListener('offline', function(e) { setLineState(navigator.onLine) });
  window.addEventListener('online', function(e) { setLineState(navigator.onLine) });

  if(lineState) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
          <Route path="/detail/:id" element={<Details />}/>
          <Route path="about" element={<RequireAuth><About /></RequireAuth>} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    );
  } else {
    return (
      <Offline></Offline>
    )
  }
  
}

function Details() {
  let { id } = useParams();
  return (
    <RequireAuth><Fitness id={id} /></RequireAuth>
  )
}

export default App;
