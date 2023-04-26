import './App.css'
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';

function App() {
  const [logado, setLogado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (nameValue) => {
    setIsLoading(true);
    await createUser({ name: nameValue });
    setLogado(true);
  };

  return (
      <Routes>
        <Route path="/" element={logado
            ? <Navigate to="/search" />
            : <Login isLoading={isLoading} handleSubmit={handleSubmit} />} />
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
