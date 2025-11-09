import { Camera, ExternalLink } from "lucide-react";

export default function Photography() {
  const photos = [
    {
      title: "Urban Landscapes",
      description: "Capturing the essence of city life",
      image:
        "https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Portrait Series",
      description: "Emotional storytelling through faces",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Nature & Wildlife",
      description: "The beauty of the natural world",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Abstract Compositions",
      description: "Finding art in everyday moments",
      image:
        "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Street Photography",
      description: "Candid moments in urban spaces",
      image:
        "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Architectural Details",
      description: "Form, light, and structure",
      image:
        "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section id="photography" className="relative py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Camera className="text-cyan-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Photography
            </h2>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A collection of visual stories captured through the lens, exploring
            light, composition, and emotion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    {photo.description}
                  </p>
                  <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <span className="text-sm font-medium">View Details</span>
                    <ExternalLink size={16} />
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
