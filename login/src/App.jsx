import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import ProtectedPage from './Components/ProtectedPage';
import useAuthStore from '../store/authStore.';

export default function App() {
  const { refreshToken, logout } = useAuthStore();

  return (
    <Router>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🔐 Auth App</h1>
        <nav className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
          <Link to="/protected" className="hover:underline">Protected</Link>
          {refreshToken && (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/protected"
            element={
              refreshToken ? (
                <ProtectedPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}
