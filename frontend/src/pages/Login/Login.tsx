import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Connect to the NestJS backend running on 3000
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Prihlásenie zlyhalo');
      }
      
      setSuccess('Úspešne prihlásený!');
      // TODO: Save token to localStorage and redirect 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[150px] opacity-20"></div>

      <div className="glass w-full max-w-md p-10 rounded-3xl shadow-2xl z-10 
                      transform transition-all hover:scale-[1.01] duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Prihlásenie
          </h1>
          <p className="text-gray-400 mt-2 text-sm font-medium">BETA Prístup</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-pulse">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Emailová adresa</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50
                         transition-all duration-300"
              placeholder="meno@email.sk"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Heslo</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50
                         transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl
                       shadow-[0_0_20px_rgba(170,59,255,0.4)] hover:shadow-[0_0_30px_rgba(170,59,255,0.6)]
                       transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Spracovávam...' : 'Vstúpiť do portálu'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Ešte nemáš účet? <a href="#" className="text-primary hover:text-white transition-colors">Vytvoriť účet</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
