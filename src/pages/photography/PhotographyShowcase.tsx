import { useState, useEffect } from "react";
import { X } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import SakuraPetals from "../../components/SakuraPetals";
import AdminLogin from "../../components/AdminLogin";
import { supabase, Photo } from "../../lib/supabase";

export default function PhotographyShowcase() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderEnabled, setOrderEnabled] = useState(true);
  const [contactEnabled, setContactEnabled] = useState(true);

  useEffect(() => {
    fetchPhotos();
    checkPageSettings();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkPageSettings = async () => {
    try {
      const [orderRes, contactRes] = await Promise.all([
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "photography_order_enabled")
          .maybeSingle(),
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "photography_contact_enabled")
          .maybeSingle(),
      ]);

      if (orderRes.data) setOrderEnabled(orderRes.data.value === "true");
      if (contactRes.data) setContactEnabled(contactRes.data.value === "true");
    } catch (error) {
      console.error("Error checking settings:", error);
    }
  };

  const navLinks = [
    { label: "Portfolio", path: "/photography/showcase" },
    ...(orderEnabled
      ? [{ label: "Order", path: "/photography/ordering" }]
      : []),
    ...(contactEnabled
      ? [{ label: "Contact", path: "/photography/contact" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 via-peach-50 to-cottage-50 relative">
      <SakuraPetals />
      <SectionHeader section="photography" links={navLinks} />
      <AdminLogin />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-4">
              Portfolio
            </h1>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto"></p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-sakura-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-brown-600">Loading portfolio...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brown-600 text-lg">
                No photos to display yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-[1.02] animate-slide-up border-2 border-cottage-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-brown-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {photo.title}
                      </h3>
                      <p className="text-peach-100 text-sm">
                        {photo.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 text-sakura-600 rounded-full shadow-md">
                      {photo.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-brown-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-h-[90vh] bg-gradient-to-br from-cottage-50 to-peach-50 rounded-3xl overflow-hidden shadow-2xl border-4 border-sakura-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-brown-800 shadow-lg transition-all hover:scale-110"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              <div className="w-full lg:w-3/5 overflow-hidden bg-brown-100 flex items-center justify-center">
                <img
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full lg:w-2/5 p-6 md:p-10 flex flex-col justify-center overflow-y-auto">
                <div className="mb-4">
                  <span className="px-4 py-2 bg-sakura-100 text-sakura-700 rounded-full text-sm font-semibold">
                    {selectedPhoto.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">
                  {selectedPhoto.title}
                </h2>
                <p className="text-lg text-brown-600 leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
