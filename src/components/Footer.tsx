import { Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Creative Portfolio
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting visual stories, bringing characters to life, and building interactive experiences.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Sections</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => document.getElementById('photography')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-400 hover:text-cyan-400 transition-colors text-sm text-left"
              >
                Photography
              </button>
              <button
                onClick={() => document.getElementById('live2d')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-400 hover:text-emerald-400 transition-colors text-sm text-left"
              >
                Live2D Rigging
              </button>
              <button
                onClick={() => document.getElementById('gamedev')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-400 hover:text-amber-400 transition-colors text-sm text-left"
              >
                Game Development
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 Creative Portfolio. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            Built with <Heart size={16} className="text-red-500" fill="currentColor" /> and passion
          </p>
        </div>
      </div>
    </footer>
  );
}
