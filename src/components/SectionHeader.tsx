import { ArrowLeft, Camera, Sparkles, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavLink {
  label: string;
  path: string;
}

interface SectionHeaderProps {
  section: 'photography' | 'live2d' | 'gamedev';
  links: NavLink[];
}

export default function SectionHeader({ section, links }: SectionHeaderProps) {
  const navigate = useNavigate();

  const config = {
    photography: {
      icon: Camera,
      color: 'sakura',
      gradient: 'from-sakura-400 to-peach-400',
      bgGradient: 'from-sakura-50 via-peach-50 to-cottage-50',
    },
    live2d: {
      icon: Sparkles,
      color: 'peach',
      gradient: 'from-peach-400 to-cottage-400',
      bgGradient: 'from-peach-50 via-cottage-50 to-sakura-50',
    },
    gamedev: {
      icon: Gamepad2,
      color: 'brown',
      gradient: 'from-brown-400 to-cottage-400',
      bgGradient: 'from-cottage-50 via-sakura-50 to-peach-50',
    },
  };

  const { icon: Icon, gradient, bgGradient } = config[section];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r ${bgGradient} backdrop-blur-md border-b-2 border-brown-200 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group`}
          >
            <ArrowLeft className="text-brown-600 group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="font-medium text-brown-700">Home</span>
          </button>

          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center shadow-md`}>
              <Icon className="text-white" size={20} />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-5 py-2 bg-white/60 hover:bg-gradient-to-r ${gradient} hover:text-white backdrop-blur-sm rounded-full font-medium text-brown-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-md">
              <span className="text-brown-700 font-medium">Menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
