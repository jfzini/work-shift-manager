import './App.css'
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import UserPage from './pages/UserPage';

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
      <Routes>
        <Route path="/" element={logado
            ? <Navigate to={`/user-page/${userName}`} />
            : <Login isLoading={isLoading} handleSubmit={handleSubmit} />} />
        <Route path="/user-page/:name" element={<UserPage />} />
        {/* <Route path="/search" element={<Search />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/*" element={<NotFound />} /> */}
      </Routes>
  );
}

export default App
