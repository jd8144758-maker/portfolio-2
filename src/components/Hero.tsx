import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Sparkles, Gamepad2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Hero() {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [gameDevEnabled, setGameDevEnabled] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    checkGameDevEnabled();
  }, []);

  const checkGameDevEnabled = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "gamedev_enabled")
        .maybeSingle();

      if (error) throw error;
      setGameDevEnabled(data?.value === "true");
    } catch (error) {
      console.error("Error checking gamedev status:", error);
    }
  };

  const getSectionOrder = () => {
    if (gameDevEnabled) {
      return ["photography", "live2d", "gamedev"];
    }
    return ["photography", "live2d"];
  };

  const sections = getSectionOrder();
  const widthClass = gameDevEnabled ? "w-1/3" : "w-1/2";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoveredSection) return;

    const currentX = e.clientX;
    const sectionIndex = sections.indexOf(hoveredSection);

    if (sectionIndex === -1) return;

    const windowWidth = window.innerWidth;
    const moveThreshold = windowWidth * 0.15;

    if (
      lastMouseXRef.current > 0 &&
      currentX < lastMouseXRef.current - moveThreshold
    ) {
      if (sectionIndex > 0) {
        setHoveredSection(sections[sectionIndex - 1]);
        lastMouseXRef.current = currentX;
      }
    } else if (
      lastMouseXRef.current > 0 &&
      currentX > lastMouseXRef.current + moveThreshold
    ) {
      if (sectionIndex < sections.length - 1) {
        setHoveredSection(sections[sectionIndex + 1]);
        lastMouseXRef.current = currentX;
      }
    }

    if (lastMouseXRef.current === 0) {
      lastMouseXRef.current = currentX;
    }
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
    lastMouseXRef.current = 0;
  };

  const handleSectionEnter = (section: string) => {
    setHoveredSection(section);
    lastMouseXRef.current = 0;
  };

  return (
    <section
      className="relative min-h-screen flex overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={(el) => {
          if (el) sectionRefs.current.photography = el;
        }}
        className={`group relative transition-all duration-700 ease-out flex items-center justify-center cursor-pointer overflow-hidden ${
          hoveredSection === "photography"
            ? "w-full"
            : hoveredSection === null
            ? widthClass
            : "w-0 opacity-0"
        }`}
        onMouseEnter={() => handleSectionEnter("photography")}
        onClick={() => navigate("/photography")}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sakura-100 via-peach-50 to-cottage-50"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-sakura-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-peach-300 rounded-full blur-3xl"></div>
        </div>

        <div
          className={`relative z-10 text-center px-6 transition-all duration-700 ${
            hoveredSection === "photography" ? "scale-110" : "scale-100"
          }`}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
            <Camera className="text-sakura-500" size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-brown-800">
            Photography
          </h2>
          <p className="text-lg md:text-xl text-brown-600 max-w-md mx-auto">
            Capturing moments through the lens
          </p>
        </div>

        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brown-300 to-transparent"></div>
      </div>

      <div
        ref={(el) => {
          if (el) sectionRefs.current.live2d = el;
        }}
        className={`group relative transition-all duration-700 ease-out flex items-center justify-center cursor-pointer overflow-hidden ${
          hoveredSection === "live2d"
            ? "w-full"
            : hoveredSection === null
            ? widthClass
            : "w-0 opacity-0"
        }`}
        onMouseEnter={() => handleSectionEnter("live2d")}
        onClick={() => navigate("/live2d")}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-peach-50 via-cottage-50 to-sakura-100"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-cottage-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-sakura-300 rounded-full blur-3xl"></div>
        </div>

        <div
          className={`relative z-10 text-center px-6 transition-all duration-700 ${
            hoveredSection === "live2d" ? "scale-110" : "scale-100"
          }`}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
            <Sparkles className="text-peach-500" size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-brown-800">
            Live2D
          </h2>
          <p className="text-lg md:text-xl text-brown-600 max-w-md mx-auto">
            Bringing 2D characters to life
          </p>
        </div>

        {gameDevEnabled && (
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brown-300 to-transparent"></div>
        )}
      </div>

      {gameDevEnabled && (
        <div
          ref={(el) => {
            if (el) sectionRefs.current.gamedev = el;
          }}
          className={`group relative transition-all duration-700 ease-out flex items-center justify-center cursor-pointer overflow-hidden ${
            hoveredSection === "gamedev"
              ? "w-full"
              : hoveredSection === null
              ? "w-1/3"
              : "w-0 opacity-0"
          }`}
          onMouseEnter={() => handleSectionEnter("gamedev")}
          onClick={() => navigate("/gamedev")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cottage-50 via-sakura-50 to-peach-50"></div>

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-96 h-96 bg-peach-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cottage-300 rounded-full blur-3xl"></div>
          </div>

          <div
            className={`relative z-10 text-center px-6 transition-all duration-700 ${
              hoveredSection === "gamedev" ? "scale-110" : "scale-100"
            }`}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
              <Gamepad2 className="text-brown-500" size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-brown-800">
              Game Dev
            </h2>
            <p className="text-lg md:text-xl text-brown-600 max-w-md mx-auto">
              Creating experiences and digital worlds
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
