import './App.css'
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';

function App() {
  const [logado, setLogado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = async (name, hour, minutes) => {
    setIsLoading(true);
    setUserName(name);
    await createUser({ name, hour, minutes });
    setLogado(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={'pt-br'}>
      <Routes>
        <Route path="/" element={logado
            ? <Navigate to={`/user-page/${userName}`} />
            : <Login isLoading={isLoading} handleSubmit={handleSubmit} />} />
        <Route path="/user-page/:name" element={<UserPage user={userName} />} />
        {/* <Route path="/search" element={<Search />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </LocalizationProvider>
  );
}

export default App
