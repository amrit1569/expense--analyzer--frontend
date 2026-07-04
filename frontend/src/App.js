import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>

      {/* Background */}
      <div className="bg-orb w-96 h-96 bg-violet-600 top-[-10%] left-[-5%]" />
      <div className="bg-orb w-80 h-80 bg-cyan-500 top-[40%] right-[-8%]" />
      <div className="bg-orb w-64 h-64 bg-emerald-500 bottom-[-5%] left-[30%]" />

      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Invalid URL */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(20,20,40,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#e2e8f0',
            fontSize: '0.875rem',
            padding: '12px 16px',
            borderRadius: '12px'
          }
        }}
      />

    </BrowserRouter>
  );
}