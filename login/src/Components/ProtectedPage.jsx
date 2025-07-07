import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore.';

export default function ProtectedPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { userId, email, getProtectedData } = useAuthStore();

  useEffect(() => {
    getProtectedData()
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold text-center">Protected Area 🔐</h1>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-semibold">User ID:</span> {userId}</p>
        <p><span className="font-semibold">Email:</span> {email}</p>
      </div>
    </div>
  );
}
