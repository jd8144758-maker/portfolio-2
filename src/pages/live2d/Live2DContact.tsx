import { useState } from "react";
import { Mail, Clock, DollarSign, Send } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import SakuraPetals from "../../components/SakuraPetals";
import { supabase } from "../../lib/supabase";

export default function Live2DContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    rigType: "",
    deadline: "",
    canStream: "",
    reference: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const message = `Discord: ${formData.discord}\nRig Type: ${formData.rigType}\nDeadline: ${formData.deadline}\nCan Stream: ${formData.canStream}\nReference: ${formData.reference}\n\n${formData.message}`;

      await supabase.from("inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          message: message,
          section: "live2d",
        },
      ]);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-inquiry-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: message,
            section: "live2d",
          }),
        }
      );

      if (!response.ok) {
        console.warn("Email sending had issues, but inquiry was saved");
      }

      setSubmitMessage(
        "Inquiry sent successfully! I will get back to you soon."
      );
      setFormData({
        name: "",
        email: "",
        discord: "",
        rigType: "",
        deadline: "",
        canStream: "",
        reference: "",
        message: "",
      });

      setTimeout(() => setSubmitMessage(""), 5000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage(
        "Error sending inquiry. Please try again or email Kairoroku@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const rigPrices = [
    {
      type: "Full Body",
      price: 600,
      description: "",
    },
    {
      type: "Half Body",
      price: 400,
      description: "",
    },
    { type: "Chibi", price: 300, description: "" },
  ];

  const navLinks = [
    { label: "Showcase", path: "/live2d/showcase" },
    { label: "Inquire", path: "/live2d/contact" },
    { label: "Terms", path: "/live2d/tos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cottage-50 to-sakura-50 relative">
      <SakuraPetals />
      <SectionHeader section="live2d" links={navLinks} />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-4">
              Commission Inquire
            </h1>
            <p className="text-brown-600 text-lg max-w-2xl mx-auto">
              Ready to bring your character to life? Fill out the form and I'll
              get back to you soon
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 text-center mb-6">
              Pricing Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {rigPrices.map((rig, index) => (
                <div
                  key={index}
                  className="p-8 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-peach-400 to-cottage-400 rounded-full mb-4">
                      <DollarSign className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-brown-800 mb-2">
                      {rig.type}
                    </h3>
                    <div className="text-4xl font-bold text-peach-600 mb-2">
                      ${rig.price}
                    </div>
                    <p className="text-brown-600 text-sm">USD</p>
                  </div>
                  <p className="text-brown-700 text-center text-sm">
                    {rig.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-peach-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-brown-800 mb-2">
                  Timeline
                </h3>
                <p className="text-brown-700 text-sm mb-2">4-8 weeks</p>
                <p className="text-brown-600 text-xs">
                  Depends on project scope
                </p>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-cottage-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-cottage-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-brown-800 mb-2">
                  Response Time
                </h3>
                <p className="text-brown-700 text-sm mb-2">Within 48 hours</p>
                <p className="text-brown-600 text-xs">Usually much faster</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-3xl p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Your Name <span className="text-peach-600">(or alias)</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="cottagecore-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="cottagecore-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Discord Username
                </label>
                <input
                  type="text"
                  value={formData.discord}
                  onChange={(e) =>
                    setFormData({ ...formData, discord: e.target.value })
                  }
                  className="cottagecore-input"
                  placeholder="username#0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Rig Type
                </label>
                <select
                  value={formData.rigType}
                  onChange={(e) =>
                    setFormData({ ...formData, rigType: e.target.value })
                  }
                  className="cottagecore-input"
                  required
                >
                  <option value="">Select type...</option>
                  <option value="full-body">Full Body - $600 USD</option>
                  <option value="half-body">Half Body - $400 USD</option>
                  <option value="chibi">Chibi - $300 USD</option>
                  <option value="animation">Animation</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-800 mb-2">
                Desired Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="cottagecore-input"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-800 mb-2">
                Can I stream the rigging process?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="canStream"
                    value="yes"
                    onChange={(e) =>
                      setFormData({ ...formData, canStream: e.target.value })
                    }
                    className="text-sakura-500 focus:ring-sakura-400"
                  />
                  <span className="text-brown-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="canStream"
                    value="no"
                    onChange={(e) =>
                      setFormData({ ...formData, canStream: e.target.value })
                    }
                    className="text-sakura-500 focus:ring-sakura-400"
                  />
                  <span className="text-brown-700">No</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-800 mb-2">
                Reference Links
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) =>
                  setFormData({ ...formData, reference: e.target.value })
                }
                className="cottagecore-input"
                placeholder="Links to character art, inspiration, etc."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-800 mb-2">
                Project Details
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="cottagecore-input min-h-[150px]"
                placeholder="Tell me about your character and what you envision..."
                required
              />
            </div>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-lg text-center font-medium ${
                  submitMessage.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cottagecore-btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              <span>
                {isSubmitting ? "Sending..." : "Submit Commission Request"}
              </span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
