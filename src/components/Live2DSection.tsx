import { Sparkles, Play } from 'lucide-react';

export default function Live2DSection() {
  const projects = [
    {
      title: 'Character Rigging',
      description: 'Full-body Live2D rigging with advanced physics',
      image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Rigging', 'Physics', 'VTuber']
    },
    {
      title: 'Facial Animation',
      description: 'Expressive facial tracking and animation',
      image: 'https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Animation', 'Expression', 'Tracking']
    },
    {
      title: 'Custom Avatars',
      description: 'Unique character designs brought to life',
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Design', 'Custom', 'Avatar']
    },
    {
      title: 'Motion Capture',
      description: 'Real-time motion capture integration',
      image: 'https://images.pexels.com/photos/7234394/pexels-photo-7234394.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['MoCap', 'Real-time', 'Tech']
    }
  ];

  return (
    <section id="live2d" className="relative py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Live2D Rigging & Animation</h2>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Bringing illustrations to life with fluid animation and interactive character rigging
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/60 transition-colors flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-emerald-500/90 hover:bg-emerald-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="text-white ml-1" fill="white" size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
