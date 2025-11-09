import { useState, useEffect } from 'react';
import { Lock, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AdminPanel from './AdminPanel';

export default function AdminLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

  useEffect(() => {
    fetchAdminPassword();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clickCount > 0) {
      timer = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [clickCount]);

  const fetchAdminPassword = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'admin_password')
        .maybeSingle();

      if (data) {
        setStoredPassword(data.value);
      }
    } catch (error) {
      console.error('Error fetching password:', error);
    }
  };

  const handleCancelClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      setIsVisible(true);
      setClickCount(0);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === storedPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsAuthenticated(false);
    setPassword('');
    setError('');
  };

  if (isAuthenticated) {
    return <AdminPanel onClose={handleClose} />;
  }

  return (
    <>
      <button
        onClick={handleCancelClick}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brown-600 hover:bg-brown-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
        title="Click 3 times for admin"
      >
        <X size={24} />
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 bg-brown-900/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-md w-full bg-gradient-to-br from-cottage-50 to-peach-50 rounded-3xl shadow-2xl border-4 border-brown-200 p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/60 hover:bg-white rounded-full flex items-center justify-center text-brown-800 transition-all hover:scale-110"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brown-600 to-cottage-600 rounded-full mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-brown-800 mb-2">Admin Access</h2>
              <p className="text-brown-600">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cottagecore-input"
                  placeholder="Enter admin password"
                  autoFocus
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-100 border-2 border-red-300 rounded-lg text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full cottagecore-btn-primary flex items-center justify-center gap-2"
              >
                <Lock size={20} />
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-brown-500">
              Default password: admin123
            </div>
          </div>
        </div>
      )}
    </>
  );
}
