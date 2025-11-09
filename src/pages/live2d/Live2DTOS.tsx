import { FileText, CheckCircle } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';
import SakuraPetals from '../../components/SakuraPetals';

export default function Live2DTOS() {
  const navLinks = [
    { label: 'Showcase', path: '/live2d/showcase' },
    { label: 'Inquire', path: '/live2d/contact' },
    { label: 'Terms', path: '/live2d/tos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cottage-50 to-sakura-50 relative">
      <SakuraPetals />
      <SectionHeader section="live2d" links={navLinks} />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-peach-100 rounded-full mb-4">
              <FileText className="text-peach-600" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-4">Terms of Service</h1>
            <p className="text-brown-600 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before commissioning
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-3xl p-8 shadow-2xl space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-sakura-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-sakura-600" size={18} />
                </div>
                <h2 className="text-2xl font-bold text-brown-800">Payment Terms</h2>
              </div>
              <div className="pl-11 space-y-3 text-brown-700">
                <p>• 50% upfront payment required to begin work</p>
                <p>• Remaining 50% due upon completion before final files are delivered</p>
                <p>• Payment accepted via PayPal, bank transfer, or Gcash for local clients</p>
                <p>• All prices are in USD unless otherwise specified</p>
              </div>
            </section>

            <div className="border-t-2 border-cottage-200"></div>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-peach-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-peach-600" size={18} />
                </div>
                <h2 className="text-2xl font-bold text-brown-800">Revisions</h2>
              </div>
              <div className="pl-11 space-y-3 text-brown-700">
                <p>• Up to 2 major revisions included in base price</p>
                <p>• Minor adjustments throughout the process are welcome</p>
                <p>• Additional major changes beyond 3 revisions will incur an extra 20 usd</p>
              </div>
            </section>

            <div className="border-t-2 border-cottage-200"></div>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-cottage-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-cottage-600" size={18} />
                </div>
                <h2 className="text-2xl font-bold text-brown-800">Timeline</h2>
              </div>
              <div className="pl-11 space-y-3 text-brown-700">
                <p>• Standard turnaround time is 4-8 weeks depending on complexity</p>
                <p>• Rush orders may be available for an additional 50% fee</p>
                <p>• Delays due to client-side revision requests will extend timeline</p>
                <p>• You'll receive regular progress updates throughout the process</p>
              </div>
            </section>

            <div className="border-t-2 border-cottage-200"></div>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-sakura-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-sakura-600" size={18} />
                </div>
                <h2 className="text-2xl font-bold text-brown-800">Usage Rights</h2>
              </div>
              <div className="pl-11 space-y-3 text-brown-700">
                <p>• You have full rights to use the model for personal and commercial purposes</p>
                <p>• You may NOT redistribute, resell, or claim the rig as your own work</p>
                <p>• Credit is appreciated but not required for personal use</p>
                <p>• Commercial use must include credit in appropriate places</p>
                <p>• I reserve the right to showcase the work in my portfolio</p>
              </div>
            </section>

            <div className="border-t-2 border-cottage-200"></div>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-peach-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-peach-600" size={18} />
                </div>
                <h2 className="text-2xl font-bold text-brown-800">Cancellation</h2>
              </div>
              <div className="pl-11 space-y-3 text-brown-700">
                <p>• Cancellations before work begins receive full refund minus payment processing fees</p>
                <p>• Once work has started, partial refunds based on work completed</p>
                <p>• No refunds after final delivery of files</p>
                <p>• I reserve the right to cancel if terms are violated</p>
              </div>
            </section>

            <div className="border-t-2 border-cottage-200"></div>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-cottage-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-cottage-600" size={18} />
                </div>
                <h2 className="text-2xl font-bold text-brown-800">File Delivery</h2>
              </div>
              <div className="pl-11 space-y-3 text-brown-700">
                <p>• Final files delivered via Google Drive or similar cloud service</p>
                <p>• Includes model files, textures, and basic setup instructions</p>
                <p>• Files backed up for 30 days after delivery for re-download if needed</p>
                <p>• Technical support provided for 14 days after delivery</p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <p className="text-brown-600 text-sm">
              Last updated: October 2025 • By commissioning, you agree to these terms
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
