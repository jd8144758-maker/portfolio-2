import Hero from '../components/Hero';
import SakuraPetals from '../components/SakuraPetals';
import AdminLogin from '../components/AdminLogin';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cottage-50 via-peach-50 to-sakura-50 relative overflow-hidden">
      <SakuraPetals />
      <Hero />
      <AdminLogin />
    </div>
  );
}
