import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Add this
import useAuthStore from '../../store/authStore.'; // ✅ remove extra dot from 'authStore.'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate(); // 👈 Init navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/protected'); // ✅ Redirect to protected page on success
    } catch (errMsg) {
      setError(errMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded p-6 mt-10 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">🔐 Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p className="text-red-600 text-center">{error}</p>}
    </form>
  );
}
