import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';
import SakuraPetals from '../../components/SakuraPetals';
import AdminLogin from '../../components/AdminLogin';
import { supabase } from '../../lib/supabase';

export default function PhotographyContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const message = `Phone: ${formData.phone}\nProject Type: ${formData.projectType}\nPreferred Date: ${formData.date}\n\n${formData.message}`;

      await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          message: message,
          section: 'photography',
        },
      ]);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-inquiry-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: message,
            section: 'photography',
          }),
        }
      );

      if (!response.ok) {
        console.warn('Email sending had issues, but inquiry was saved');
      }

      setSubmitMessage('Message sent successfully! I will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        date: '',
        message: ''
      });

      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error sending message. Please try again or contact directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { label: 'Portfolio', path: '/photography/showcase' },
    { label: 'Order', path: '/photography/ordering' },
    { label: 'Contact', path: '/photography/contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 via-peach-50 to-cottage-50 relative">
      <SakuraPetals />
      <SectionHeader section="photography" links={navLinks} />
      <AdminLogin />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-4">Get In Touch</h1>
            <p className="text-brown-600 text-lg max-w-2xl mx-auto">
              Let's discuss your photography needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-sakura-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Mail className="text-sakura-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-brown-800 mb-2">Email</h3>
              <p className="text-brown-700 text-sm">hello@photography.com</p>
            </div>

            <div className="p-6 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Phone className="text-peach-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-brown-800 mb-2">Phone</h3>
              <p className="text-brown-700 text-sm">+1 (555) 123-4567</p>
            </div>

            <div className="p-6 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-cottage-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="text-cottage-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-brown-800 mb-2">Location</h3>
              <p className="text-brown-700 text-sm">Los Angeles, CA</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="cottagecore-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="cottagecore-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown-800 mb-2">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="cottagecore-input"
                  required
                >
                  <option value="">Select type...</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="wedding">Wedding</option>
                  <option value="event">Event Photography</option>
                  <option value="commercial">Commercial Shoot</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-800 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="cottagecore-input"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-800 mb-2">
                Tell me about your project
                </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="cottagecore-input min-h-[150px]"
                placeholder="Share your vision and any specific requirements..."
                required
              />
            </div>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-lg text-center font-medium ${
                  submitMessage.includes('successfully')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
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
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
