import { Menu, X, Camera, Sparkles, Gamepad2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isPhotographyActive = location.pathname.startsWith('/photography');
  const isLive2DActive = location.pathname.startsWith('/live2d');
  const isGameDevActive = location.pathname.startsWith('/gamedev');

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Portfolio
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/photography')}
              className={`flex items-center gap-2 transition-colors ${
                isPhotographyActive ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              <Camera size={18} />
              <span>Photography</span>
            </button>
            <button
              onClick={() => navigate('/live2d')}
              className={`flex items-center gap-2 transition-colors ${
                isLive2DActive ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              <Sparkles size={18} />
              <span>Live2D</span>
            </button>
            <button
              onClick={() => navigate('/gamedev')}
              className={`flex items-center gap-2 transition-colors ${
                isGameDevActive ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              <Gamepad2 size={18} />
              <span>Game Dev</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button
              onClick={() => {
                navigate('/photography');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-2xl text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Camera size={24} />
              <span>Photography</span>
            </button>
            <button
              onClick={() => {
                navigate('/live2d');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-2xl text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Sparkles size={24} />
              <span>Live2D</span>
            </button>
            <button
              onClick={() => {
                navigate('/gamedev');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-2xl text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Gamepad2 size={24} />
              <span>Game Dev</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
