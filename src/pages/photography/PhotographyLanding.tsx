import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, ShoppingCart, Mail } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function PhotographyLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-950 to-black"></div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto py-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <Camera className="text-cyan-400" size={48} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Photography Services
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Capturing moments that matter. Professional photography for portraits, events, landscapes, and commercial projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/photography/showcase')}
              className="group p-8 bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Image className="text-cyan-400 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold text-white mb-2">Portfolio</h3>
              <p className="text-slate-400 text-sm">Browse my latest work</p>
            </button>

            <button
              onClick={() => navigate('/photography/ordering')}
              className="group p-8 bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="text-cyan-400 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold text-white mb-2">Order Prints</h3>
              <p className="text-slate-400 text-sm">Purchase high-quality prints</p>
            </button>

            <button
              onClick={() => navigate('/photography/contact')}
              className="group p-8 bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Mail className="text-cyan-400 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
              <p className="text-slate-400 text-sm">Book a session or inquire</p>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
