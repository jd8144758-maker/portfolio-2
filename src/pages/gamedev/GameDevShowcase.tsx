import { useState, useEffect } from 'react';
import { ExternalLink, X, Calendar, Users } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';
import SakuraPetals from '../../components/SakuraPetals';
import AdminLogin from '../../components/AdminLogin';
import { supabase, Game } from '../../lib/supabase';

export default function GameDevShowcase() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_enabled', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const normalizedData = (data || []).map(game => ({
        ...game,
        tech: Array.isArray(game.tech) ? game.tech : [],
      }));

      setGames(normalizedData);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [{ label: 'Back', path: '/' }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cottage-50 via-sakura-50 to-peach-50 relative">
      <SakuraPetals />
      <SectionHeader section="gamedev" links={navLinks} />
      <AdminLogin />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-4">
              Game Portfolio
            </h1>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              Interactive experiences crafted with passion
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-brown-600">Loading games...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brown-600 text-lg">No games to display yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game, index) => (
                <div
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group relative overflow-hidden rounded-2xl bg-white border-2 border-cottage-200 hover:border-brown-300 transition-all duration-500 cursor-pointer hover:scale-[1.02] shadow-lg hover:shadow-2xl animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={game.image_url}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-brown-800 mb-1">{game.title}</h3>
                    <p className="text-brown-600 text-sm font-medium mb-3">{game.genre}</p>
                    <p className="text-brown-700 text-sm mb-4 leading-relaxed">{game.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {game.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-cottage-100 text-brown-700 rounded-full border border-cottage-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedGame && (
        <div
          className="fixed inset-0 z-50 bg-brown-900/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-gradient-to-br from-cottage-50 to-peach-50 rounded-3xl overflow-hidden shadow-2xl border-4 border-brown-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-brown-800 shadow-lg transition-all hover:scale-110"
            >
              <X size={24} />
            </button>

            <div className="aspect-video overflow-hidden bg-brown-100">
              <img
                src={selectedGame.image_url}
                alt={selectedGame.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="mb-4">
                <span className="px-4 py-2 bg-brown-100 text-brown-700 border-2 border-brown-300 rounded-full text-sm font-semibold">
                  {selectedGame.genre}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-brown-800 mb-4">{selectedGame.title}</h2>
              <p className="text-lg text-brown-700 leading-relaxed mb-6">{selectedGame.description}</p>

              <div className="flex items-center gap-6 mb-6 text-brown-700">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {selectedGame.year}
                </span>
                <span className="flex items-center gap-2">
                  <Users size={18} />
                  {selectedGame.players}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-brown-800 mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedGame.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white border-2 border-cottage-200 text-brown-700 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 cottagecore-btn-primary">
                <ExternalLink size={20} />
                <span>View Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
