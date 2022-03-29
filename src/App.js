import './App.min.css';
import { Fitness } from './page/fitness'
import { About } from './page/about'
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from './components/RequireAuth'
import { Login } from './page/login'
import { Logout } from './page/logout'
import { Signup } from './page/signup'
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<RequireAuth><Fitness /></RequireAuth>} />
        <Route path="about" element={<RequireAuth><About /></RequireAuth>} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
