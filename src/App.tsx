import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ModelProvider } from './context/ModelContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Dashboard } from './pages/Dashboard';
import { Playground } from './pages/Playground';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ModelProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="playground" element={<Playground />} />
              <Route path="models" element={<div className="p-4">Models Page</div>} />
              <Route path="datasets" element={<div className="p-4">Datasets Page</div>} />
              <Route path="analytics" element={<div className="p-4">Analytics Page</div>} />
              <Route path="documents" element={<div className="p-4">Documents Page</div>} />
              <Route path="history" element={<div className="p-4">History Page</div>} />
              <Route path="settings" element={<div className="p-4">Settings Page</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ModelProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;