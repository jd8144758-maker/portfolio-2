import { Gamepad2, Github, ExternalLink } from 'lucide-react';

export default function GameDev() {
  const games = [
    {
      title: 'Neon Runner',
      genre: 'Action Platformer',
      description: 'Fast-paced cyberpunk platformer with fluid movement mechanics',
      image: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Unity', 'C#', '2D'],
      status: 'Released'
    },
    {
      title: 'Mystic Realms',
      genre: 'RPG Adventure',
      description: 'Story-driven RPG with dynamic combat and branching narratives',
      image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Unreal', 'Blueprint', '3D'],
      status: 'In Development'
    },
    {
      title: 'Puzzle Nexus',
      genre: 'Puzzle Strategy',
      description: 'Mind-bending puzzles that blend logic with spatial reasoning',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Godot', 'GDScript', '2D'],
      status: 'Released'
    },
    {
      title: 'Stellar Voyage',
      genre: 'Space Exploration',
      description: 'Open-world space exploration with procedural generation',
      image: 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Unity', 'C#', '3D'],
      status: 'Prototype'
    }
  ];

  return (
    <section id="gamedev" className="relative py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Gamepad2 className="text-amber-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Game Development</h2>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Creating immersive interactive experiences from concept to playable reality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    game.status === 'Released' ? 'bg-green-500/90 text-white' :
                    game.status === 'In Development' ? 'bg-amber-500/90 text-white' :
                    'bg-slate-500/90 text-white'
                  }`}>
                    {game.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">{game.title}</h3>
                    <p className="text-amber-400 text-sm font-medium">{game.genre}</p>
                  </div>
                </div>

                <p className="text-slate-400 mb-4 leading-relaxed">{game.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {game.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors">
                    <Github size={18} className="text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">Source</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors">
                    <ExternalLink size={18} className="text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">Play</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
